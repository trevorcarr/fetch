/* 
 * © 2017-03: Florian Haimerl
 */

/*jslint node: true, browser: true */
/*global google*/
"use strict";

function WalkCycleView() {
    var topInfo_div = document.getElementById("top_info");
    var toggleWalkButton = document.getElementById("toggle_walk_button");
    var menuButton = document.getElementById("menu_button");
    var overview = document.getElementById("walkOverview");
    var distance_p = document.getElementById('distance');
    var duration_p = document.getElementById('duration');
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

    this.init = function () {
        menuButton.addEventListener("click", this.toggleOverview);
    };

    this.onPositionUpdate = function () {
        that.updateWalkDataDisplay();
    };

    this.updateWalkDataDisplay = function () {
        distance_p.textContent = "Distance: " + (getDistanceCallback() / 1000).toFixed(2) + " km";
    };

    this.toggleOverview = function () {
        overview.classList.toggle('hidden');
    };

    this.setMode = function (mode, role) {
        console.log("view_mode: " + mode);
        switch (mode) {
            case 'pick_up':
                if (role === 'walker') {
                    walk_headline_div.textContent = 'Picking up ' + getDogCallback().name;
                } else if (role === 'owner') {
                    walk_headline_div.textContent = 'Waiting for ' + getDogCallback().name + ' to be picked up.';
                }
                
                menuButton.classList.add('hidden');
                toggleWalkButton.classList.add('hidden');
                break;
            case 'start_walk':
                if (role === 'walker') {
                    walk_headline_div.textContent = 'Going to start a walk with ' + getDogCallback().name;
                    menuButton.classList.remove('hidden');
                    toggleWalkButton.classList.remove('hidden');
                    toggleWalkButton.textContent = 'start';
                    toggleWalkButton.addEventListener("click", startWalkCallback);
                    toggleWalkButton.removeEventListener("click", stopWalkCallback);
                } else if (role === 'owner') {
                    walk_headline_div.textContent = getDogCallback().name + 'is being taken to his walk';
                }
                break;
            case 'walk':
                if (role === 'walker') {
                    walk_headline_div.textContent = 'Walking with ' + getDogCallback().name;
                    menuButton.classList.remove('hidden');
                    toggleWalkButton.classList.remove('hidden');
                    toggleWalkButton.textContent = 'stop';
                    toggleWalkButton.addEventListener("click", stopWalkCallback);
                    toggleWalkButton.removeEventListener("click", startWalkCallback);
                } else if (role === 'owner') {
                    walk_headline_div.textContent = getDogCallback().name + ' is on his walk';
                }
                update_time_interval = setInterval(function () {
                    duration_p.textContent = "Duration: " + (getDurationCallback().formatTime());
                }, 1000);
                break;
            case 'return':
                if (role === 'walker') {
                    walk_headline_div.textContent = 'Returning ' + getDogCallback().name;
                    menuButton.classList.remove('hidden');
                    toggleWalkButton.classList.add('hidden');
                } else if (role == 'owner') {
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


Number.prototype.formatTime = function () {
    var seconds = Math.floor(this / 1000);
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds - hours * 3600) / 60);
    seconds = seconds % 60;
    var ret_string = '';

    if (hours > 0) {
        if (hours < 10) {
            hours = '0' + hours;
        }
        ret_string += hours + ':';
    }
    if (minutes > 0 || ret_string !== '') {
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        ret_string += minutes + ':';
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    ret_string += seconds;

    if (this > 3600000) {
        ret_string += ' hours';
    } else if (this > 60000) {
        ret_string += ' minutes';
    } else {
        ret_string += ' seconds';
    }
    return ret_string;
};

