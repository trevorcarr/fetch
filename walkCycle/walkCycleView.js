/* 
 * © 2017-03: Florian Haimerl
 */

/*jslint node: true, browser: true */
/*global google*/
"use strict";

function WalkCycleView() {
    var topInfo_div = document.getElementById("top_info");
    var toggleWalkButton = document.getElementById("toggle_walk_button");
    var overview = document.getElementById("walkOverview");
    
    var distance_div = document.getElementById('distance');
    var duration_div = document.getElementById('duration');
    var walk_headline_div = document.getElementById('walk_headline_div');

    var getDogCallback = null;
    var startWalkCallback = null;
    var stopWalkCallback = null;
    var getDistanceCallback = null;
    var getDurationCallback = null;


    //TODO I hat this! There has to be a better solution! :/ 
//Reason for this: in setMode, 'this' is not set (we come from an onClick)
    var that = this;
    var update_time_interval = null;
    
    this.init = function() {
        
    };

    this.onPositionUpdate = function () {
        that.updateWalkDataDisplay();
    };

    this.updateWalkDataDisplay = function () {
        distance_div.textContent = (getDistanceCallback() / 1000).toFixed(2) + " km";
    };

    this.setMode = function (mode, role, use_drive_to_walk_phase) {
        console.log("view_mode: " + mode);
        switch (mode) {
            case 'pick_up':
                if (role === 'walker') {
                    walk_headline_div.textContent = 'Picking up ' + getDogCallback().name;
                } else if (role === 'owner') {
                    walk_headline_div.textContent = 'Waiting for ' + getDogCallback().name + ' to be picked up.';
                }
                topInfo_div.classList.remove('hidden');
                
                toggleWalkButton.classList.add('hidden');
                break;
            case 'start_walk':
                if (role === 'walker') {
                    walk_headline_div.textContent = 'Going to start a walk with ' + getDogCallback().name;
                    if(use_drive_to_walk_phase) {
                        toggleWalkButton.classList.remove('hidden');
                        toggleWalkButton.textContent = 'start';
                        toggleWalkButton.addEventListener("click", startWalkCallback);
                        toggleWalkButton.removeEventListener("click", stopWalkCallback);
                    }
                } else if (role === 'owner') {
                    walk_headline_div.textContent = getDogCallback().name + 'is being taken to his walk';
                }
                break;
            case 'walk':
                overview.classList.remove('hidden');
                that.updateWalkDataDisplay();
                if (role === 'walker') {
                    walk_headline_div.textContent = 'Walking with ' + getDogCallback().name;
                    if(use_drive_to_walk_phase) {
                        toggleWalkButton.classList.remove('hidden');
                        toggleWalkButton.textContent = 'stop';
                        toggleWalkButton.addEventListener("click", stopWalkCallback);
                        toggleWalkButton.removeEventListener("click", startWalkCallback);
                    }
                } else if (role === 'owner') {
                    walk_headline_div.textContent = getDogCallback().name + ' is on his walk';
                }
                duration_div.textContent = (getDurationCallback().formatTime());
                update_time_interval = setInterval(function () {
                    duration_div.textContent = (getDurationCallback().formatTime());
                }, 1000);
                break;
            case 'return':
                if (role === 'walker') {
                    walk_headline_div.textContent = 'Returning ' + getDogCallback().name;
                    if(use_drive_to_walk_phase) {
                        toggleWalkButton.classList.add('hidden');
                    }
                } else if (role === 'owner') {
                    walk_headline_div.textContent = getDogCallback().name + ' is returning';
                }
                clearInterval(update_time_interval);
                break;
            default:
                break;
        }
    };

    this.setGetDogCallback = function (cb_function) {
        getDogCallback = cb_function;
    };

    this.setStartWalkCallback = function (cb_function) {
        startWalkCallback = cb_function;
    };

    this.setStopWalkCallback = function (cb_function) {
        stopWalkCallback = cb_function;
    };

    this.setGetDistanceCallback = function (cb_function) {
        getDistanceCallback = cb_function;
    };

    this.setGetDurationCallback = function (cb_function) {
        getDurationCallback = cb_function;
    };
}