/* 
 * © 2017-03: Florian Haimerl
 */

/*jslint node: true, browser: true */
/*global google*/
"use strict";

function WalkCycleView() {
    var topInfo_div = document.getElementById("top_info");
    var toggleWalkButton = document.getElementById("toggle_walk_button");
    var getDogCallback = null;
    var startWalkCallback = null;
    var stopWalkCallback = null;


    var setTopInfoContent = function (name) {
        topInfo_div.textContent = name;
    };

    this.setMode = function (mode, role) {
        console.log("view_mode: " + mode);
        setTopInfoContent(getDogCallback());
        if (role === 'walker') {
            switch (mode) {
                case 'pick_up':
                    toggleWalkButton.classList.add('hidden');
                    break;
                case 'start_walk':
                    toggleWalkButton.classList.remove('hidden');
                    toggleWalkButton.textContent = 'start';
                    toggleWalkButton.addEventListener("click", startWalkCallback);
                    toggleWalkButton.removeEventListener("click", stopWalkCallback);
                    break;
                case 'walk':
                    toggleWalkButton.classList.remove('hidden');
                    toggleWalkButton.textContent = 'stop';
                    toggleWalkButton.addEventListener("click", stopWalkCallback);
                    toggleWalkButton.removeEventListener("click", startWalkCallback);
                    break;
                case 'return':
                    toggleWalkButton.classList.add('hidden');
                    break;
                default:

                    break;
            }
        } else {
            //TODO
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

}
