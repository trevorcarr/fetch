/* 
 * © 2017-03: Florian Haimerl
 */

/*jslint node: true, browser: true */
/*global google*/
/*global Helper*/
/*global Profile*/
"use strict";


function WalkCycleModel() {
    var role = (new Helper()).getUrlParameter('role'), //walker | owner
            map = new Map('map_div'),
            dog = null, //TODO: just a placeholder
            owner = new Profile(null, null, JSON.parse(localStorage.getItem("owner"))),
            walker = new Profile(null, null, JSON.parse(localStorage.getItem("walker"))),
            setModeCallback = null,
            mode = "",
            max_target_distance = 50, //in metres
            time_start_of_walk = null,
            duration_of_walk = null,
            positionUpdateCallback = null,
            use_drive_to_walk_phase = false,
//TODO I hat this! There has to be a better solution! :/ 
//Reason for this: startwalk and stopwalk are onclick, therefore "this" is the button
            that = this;


    this.init = function () {
        var my_pos = map.getPosition();
        var pos = new google.maps.LatLng(my_pos.lat(), my_pos.lng() + 0.01);
        var target_name = null;
        var target_position = null;
        dog = {name: "Fido",
            owner_name: owner.name,
            position: null,
//            average_rating: owner.getScore(),
            average_rating: 4,
            ratings:owner.ratings.length};
        
        if (role === 'walker') {
            dog.position = pos;
            target_name = dog.name;
            target_position = dog.position;
        } else if (role === 'owner') {
            map.showEnemy(pos);
            target_name = dog.owner_name;
            target_position = my_pos;
        }
        map.addMarker(target_position, target_name, 1, true);
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
                if (role === 'walker') {
                    map.setPositionUpdateCallback(function () {
                        if (map.getDistanceToTarget() <= max_target_distance) {
                            window.alert('reached ' + dog.name +' Enjoy your walk!');
                            that.setMode('start_walk');
                        }
                        that.onPositionUpdate();
                    });
                } else if (role === 'owner') {
                    map.setEnemyPositionUpdateCallback(function () {
                        if (map.getDistanceToTarget(true) <= max_target_distance) {
                            window.alert(walker.name + ' has arrived');
                            that.setMode('start_walk');
                        }
                    });
                }
                break;
            case 'start_walk':
                if (!use_drive_to_walk_phase) {
                    that.setMode('walk');
                    return;
                }
                break;
            case 'walk':
                time_start_of_walk = new Date();
                map.updatePath(role === 'owner');
                if(role === 'walker') {
                    map.setPositionUpdateCallback(function () {
                        that.onPositionUpdate();
                        that.walkerPositionUpdate();
                    });
                } else if (role === 'owner') {
                    map.setEnemyPositionUpdateCallback(that.walkerPositionUpdate);
                }
                break;
            case 'return':
                duration_of_walk = this.getDuration();
                if (role === 'walker') {
                    map.setPositionUpdateCallback(function () {
                        that.onPositionUpdate();
                        that.finishWalkIfAtTarget();
                    });
                }
                break;
            default:
                break;
        }
        setModeCallback(mode, role, use_drive_to_walk_phase);
    };
    
    this.walkerPositionUpdate = function () {
        map.updatePath(role === 'owner');
        if (positionUpdateCallback) {
            positionUpdateCallback();
        }
        if(!use_drive_to_walk_phase) {
            that.finishWalkIfAtTarget(role === 'owner');
            return;
        }
        
    };
    
    this.finishWalkIfAtTarget = function (of_enemy) {
        if (map.getDistanceToTarget(of_enemy) <= max_target_distance) {
            var url_path = encodeURIComponent(map.getPathJson()),
                url_duration = encodeURIComponent(that.getDuration());
        if (role === 'owner') {
            window.alert(walker.name + ' returned with ' + dog.name);
        } else if (role === 'walker') {
            window.alert(dog.name + ' is reunited with ' + dog.owner_name);
            }

            (new Helper ()).setItemInLocalStorage("path", map.getPathJson());
            (new Helper ()).setItemInLocalStorage("time", JSON.stringify(that.getDuration()));
            (new Helper ()).setItemInLocalStorage("owner_name", JSON.stringify(dog.owner_name));
            (new Helper ()).setItemInLocalStorage("dog_name", JSON.stringify(dog.name));
            (new Helper ()).setItemInLocalStorage("walker_name", JSON.stringify(walker.name));
            
            var user = (role === 'walker') ? walker : dog;
            (new Helper ()).setItemInLocalStorage("avg_rating", JSON.stringify(user.average_rating));
            (new Helper ()).setItemInLocalStorage("ratings", JSON.stringify(user.ratings));
            if (role === 'walker') {
                window.open('../postWalk/postWalkWalker.html', '_self');
            } else if (role === 'owner') {
                window.open('../postWalk/postWalkOwner.html', '_self');
            }
        }
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
    };
}
