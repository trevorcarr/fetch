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
    this.position = null;
    this.blue_marker = new google.maps.Marker({
            icon: '../images/bluecircle.png',
            map: this.googleMap
    });
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
                that.onPositionUpdate(event.latLng);
            })
            clearInterval(id);
        }
    }, 500);
}

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

Map.prototype.updatePath = function () {
    var position = this.blue_marker.getPosition();
    this.path.getPath().push(position);
};

Map.prototype.clearPath = function () {
    this.path.getPath().clear();
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

Map.prototype.getDistanceToTarget = function () {
    if(this.target_marker && this.target_marker.getPosition() && this.blue_marker && this.blue_marker.getPosition()) {
        return calculateDistance(this.blue_marker.getPosition(), this.target_marker.getPosition());
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

//Events:
Map.prototype.setPositionUpdateCallback = function (cb_function) {
    this.position_update_callback = cb_function;
};


Map.prototype.setMarkerClickCallback = function (cb_function) {
    this.marker_callback = cb_function;
};