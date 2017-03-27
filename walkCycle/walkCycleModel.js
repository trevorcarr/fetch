/* 
 * © 2017-03: Florian Haimerl
 */

/*jslint node: true, browser: true */
/*global google*/
"use strict";
var getUrlParameter = function (name) {
    var argument_strings = window.location.href.split('?')[1].split('&');
    for (var i = 0; i < argument_strings.length; i++) {
        var argument_split = argument_strings[i].split('=');
        if (argument_split.length > 1 && argument_split[0] === name) {
            return argument_split[1];
        }
    }
    return '';
};

function WalkCycleModel() {
    var role = getUrlParameter('role'), //walker | owner
        map = new Map('map_div'),
        dog = null, //TODO: just a placeholder
        setModeCallback = null,
        mode = "",
        max_target_distance = 10,//in metres
//TODO I hat this! There has to be a better solution! :/ 
//Reason for this: startwalk and stopwalk are onclick, therefore "this" is the button
        that = this;


    this.init = function () {
        dog = {name: "Fido",
            position: map.getPosition()};
        dog.position = new google.maps.LatLng(dog.position.lat(), dog.position.lng() + 0.01);
        map.addMarker(dog.position, dog.name, 1, true);
        map.setMarkerClickCallback(this.onMarkerClick);
    };

    this.PositionIsSet = function () {
        if (map.getPosition()) {
            return true;
        }
        return false;
    };

    this.setSetModeCallback = function (cb_function) {
        setModeCallback = cb_function;
    };

    this.setMode = function (m) {
        mode = m;
        console.log("model_mode: " + mode);
        if (role === 'walker') {
            switch (mode) {
            case 'pick_up':
                map.clearPath();
                map.setPositionUpdateCallback(function () {
                    if (map.getDistanceToTarget() <= max_target_distance) {
                        window.alert('reached target! Start walk:');
                        that.setMode('start_walk');
                    }
                });
                break;
            case 'start_walk':
                break;
            case 'walk':
                map.updatePath();
                map.setPositionUpdateCallback(function () {
                    map.updatePath();
                    console.log(map.getLengthOfPathInM());
                });
                break;
            case 'return':
                map.setPositionUpdateCallback(function () {
                    if (map.getDistanceToTarget() <= max_target_distance) {
                        window.alert('reached target! we should get to the finish page here! Instead, we are picking up again');
                        that.setMode('pick_up');
                    }
                });
                break;
            default:

                break;
            }
        }
        else {
               switch (mode) {
            case 'pick_up':
                break;
            case 'start_walk':
                break;
            case 'walk':
                break;
            case 'return':
                break;
            default:

                break;
            }
           }
        setModeCallback(mode, role);
    };


    this.getDog = function () {
        return dog;
    };

    this.onMarkerClick = function (id) {
        window.alert(id);
    };
    var setMode = function (test) {
        window.alert(test);
        
    };
    this.startWalk = function () {
        that.setMode("walk");
    };
    
    this.stopWalk = function () {
        that.setMode("return");
    };
}
