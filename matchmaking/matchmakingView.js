/* global google */

function MatchmakingView(cb_function) {

    var map = new Map('map_div', cb_function);
    var display = document.getElementById("show_user");

    this.addMainMarker = function(name, id) {
        map.addMarker(map.getPosition(), name, id, true);
    };
    
    this.addMarker = function(position, name, id) {
        map.addMarker(position, name, id, false);
    };
    
    this.getMap = function() {
        return map;
    };
    
    this.displayProfile = function(profile) {
        display.innerHTML = "";
        display.innerHTML += "<span id =\"userName\">" + profile.name + "</span>";
        display.innerHTML += "<img id=\"userPhoto\" src=\"../images/profile" + profile.id + ".png\"></img>";
    };
    
    function isMatch() {
        return Math.random() >= 0.5;
    }
}