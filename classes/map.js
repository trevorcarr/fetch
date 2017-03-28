/* 
 * © 2017-03: Florian Haimerl
 */

/*jslint node: true, browser: true */
/*global google */
"use strict";

function Map(map_div_id, marker_cb) {
    this.googleMap = new google.maps.Map(document.getElementById(map_div_id), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 16
    });
    this.marker_callback = (marker_cb)? marker_cb : null;
    this.path = new google.maps.Polyline({
            path: [],
            geodesic: false,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2,
            map: this.googleMap
        });
    this.enemy = {is_visible: false,
                  marker: new google.maps.Marker({
                      
                      icon: {
                          path: google.maps.SymbolPath.CIRCLE,
                          scale: 5
                      },
                      map: this.googleMap
                  }),
                  position_update_callback: null
              };
    this.blue_marker = new google.maps.Marker({
            icon: '../images/bluecircle.png',
            map: this.googleMap
    }); //blue marker is always me! Not the walker
    this.target_marker = null;
    this.is_centered = false;
    this.control_position = true;   //  For debugging: If this is true, after the initial gps location is found, 
                                    //  touching the map sets a new position
    this.position_update_callback = null;                                
    
    
    
    //it is necessary to do this. Otherwise, we would not have the map object in the intervall function
    var that=this;
    var id = setInterval(function () {
        that.updatePosition();
        if(that.control_position && that.blue_marker.getPosition()) {
            that.googleMap.addListener("click", function (event) {
                if(that.enemy.is_visible) {
                    //In reality, we would do this in a network listener and get the position from the network
                    that.onEnemyPositionUpdate(event.latLng);
                } else {
                    that.onPositionUpdate(event.latLng);
                }
            });
            clearInterval(id);
        }
    }, 500);
}

Map.prototype.showEnemy = function (pos) {
    this.enemy.is_visible = true;
    this.enemy.marker.setPosition(pos);
};

Map.prototype.addMarker = function (position, user_name, user_id, is_target) {
    var marker = new google.maps.Marker({
        position: position,
        map: this.googleMap,
        title: user_name
    });
    var _this = this;

    marker.addListener('click', function () {
        _this.marker_callback(user_id);
    });
    
    if(is_target) {
        this.target_marker = marker;
    }
};

Map.prototype.updatePath = function (of_enemy) {
    var user = (of_enemy) ? this.enemy.marker : this.blue_marker;
    var position = user.getPosition();
    this.path.getPath().push(position);
};

Map.prototype.clearPath = function () {
    this.path.getPath().clear();
};

Map.prototype.onEnemyPositionUpdate = function (pos) {
    if (this.enemy.is_visible) {
        this.enemy.marker.setPosition(pos);
        if (this.enemy.position_update_callback) {
            this.enemy.position_update_callback();
        }
        
    }
};


Map.prototype.onPositionUpdate = function (pos) {
    this.blue_marker.setPosition(pos);
    if (!this.is_centered) {
        this.is_centered = true;
        this.googleMap.setCenter(pos);
    }
    if(typeof this.position_update_callback === "function") {
        this.position_update_callback();
    }
};

//TODO: Use googles location Api
Map.prototype.updatePosition = function () {
    var that = this,
        options = {enableHighAccuracy: true,
                   timeout: 900};
    //Get the current Position
    navigator.geolocation.getCurrentPosition(function (position) {     
        //generate a position that is close to the current position
        //(Reminder: Longitude is left / rigt)
        that.onPositionUpdate(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            
    }, function () {
        console.log("no location found");
    },options);
};


Map.prototype.getPosition = function () {
    return this.blue_marker.getPosition();
};


function calculateDistance(pos1, pos2) {
    return google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2);
}

Map.prototype.getDistanceToTarget = function (of_enemy) {
    var user = (of_enemy) ? this.enemy.marker : this.blue_marker;
    if(this.target_marker && this.target_marker.getPosition() && user && user.getPosition()) {
        return calculateDistance(user.getPosition(), this.target_marker.getPosition());
    }
};


Map.prototype.getLengthOfPathInM = function () {
    var length = 0,
        path= this.path.getPath();
    for(var i = 1; i < path.getLength(); i++) {
        length += calculateDistance(path.getAt(i-1), path.getAt(i));
    }
    return length;
};

Map.prototype.getPathJson = function () {
    return JSON.stringify(this.path.getPath().getArray());
};


Map.prototype.setPathJson = function (path_string) {
    this.path.setPath(JSON.parse(path_string));
    this.path.setMap(this.googleMap);
    if (this.path.getPath().getLength() > 0) {
        this.googleMap.setCenter(this.path.getPath().getAt(0));
        this.is_centered=true;
        this.googleMap.setZoom(14);
    }
};

//Events:
Map.prototype.setPositionUpdateCallback = function (cb_function) {
    this.position_update_callback = cb_function;
};


Map.prototype.setMarkerClickCallback = function (cb_function) {
    this.marker_callback = cb_function;
};


Map.prototype.setEnemyPositionUpdateCallback = function (cb_function) {
    this.enemy.position_update_callback = cb_function;
};