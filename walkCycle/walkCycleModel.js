/* 
 * © 2017-03: Florian Haimerl
 */

/*jslint node: true, browser: true */
/*global google*/
/*global Helper*/
"use strict";


function WalkCycleModel() {
    var role = (new Helper()).getUrlParameter('role'), //walker | owner
            map = new Map('map_div'),
            dog = null, //TODO: just a placeholder
            setModeCallback = null,
            mode = "",
            max_target_distance = 15, //in metres
            time_start_of_walk = null,
            duration_of_walk = null,
            positionUpdateCallback = null,
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
        switch (mode) {
            case 'pick_up':
                map.clearPath();
                if (role == 'walker') {
                    map.setPositionUpdateCallback(function () {
                        if (map.getDistanceToTarget() <= max_target_distance) {
                            window.alert('reached ' + dog.name + ' Hit start, as soon as you start walking!');
                            that.setMode('start_walk');
                        }
                        that.onPositionUpdate();
                    });
                } else if (role == 'owner') {
                    //TODO: DO a position of the other one - update callback...
                }
                break;
            case 'start_walk':
                break;
            case 'walk':
                time_start_of_walk = new Date();
                map.updatePath();
                map.setPositionUpdateCallback(function () {
                    map.updatePath();
                    console.log(map.getLengthOfPathInM());
                    that.onPositionUpdate();
                });
                break;
            case 'return':
                duration_of_walk = this.getDuration();
                if (role == 'walker') {
                    map.setPositionUpdateCallback(function () {
                        if (map.getDistanceToTarget() <= max_target_distance) {
                            window.open('../postWalk/postWalkWalker.html?path=' + map.getPathJson(), '_self');
                        }
                        that.onPositionUpdate();
                    });
                } else if (role == 'owner') {
                    // TODO: Again, we need a on position of the other one - update...
                }

                break;
            default:
                break;
        }
        setModeCallback(mode, role);
    };

    this.onPositionUpdate = function () {
        if (positionUpdateCallback) {
            positionUpdateCallback();
        }
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

    this.getLengthOfWalk = function () {
        return map.getLengthOfPathInM();
    };

    this.getDuration = function () {
        if (duration_of_walk) {
            return duration_of_walk;
        } else if (time_start_of_walk) {
            var now = new Date();
            return now - time_start_of_walk;
        } else {
            return 0;
        }
    };



    this.setPositionUpdateCallback = function (cb_function) {
        positionUpdateCallback = cb_function;
    }
}
