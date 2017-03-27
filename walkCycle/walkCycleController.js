/* 
 * © 2017-03: Florian Haimerl
 */

/*jslint node: true, browser: true */
/*global WalkCycleModel*/
/*global WalkCycleView*/
"use strict";

var model = new WalkCycleModel();
var view = new WalkCycleView();

function WalkCycleController() {
    this.init = function () {
        var interval_id = setInterval(function () {
            if(!model.PositionIsSet()) {
                return;
            }
            view.setGetDogCallback(model.getDog);
            view.setStartWalkCallback(model.startWalk);
            view.setStopWalkCallback(model.stopWalk);            
            model.init();
            model.setSetModeCallback(view.setMode);
            model.setMode("pick_up");
            clearInterval(interval_id);
        },250);
    };
}


var controller = new WalkCycleController();
window.addEventListener("load", controller.init);