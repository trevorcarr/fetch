/* global google */

function MatchmakingView(cb_function) {

    var map = new Map('map_div', cb_function);
    var nameDisplay = document.getElementById("userName");
    var imgDisplay = document.getElementById("userPhoto");
    var confirmButton = document.getElementById("confirmUser");
    var closeButton = document.getElementById("closeUser");
    

    

    this.addMainMarker = function(name, id) {
        map.addMarker(map.getPosition(), name, id, true);
    };
    
    this.addMarker = function(position, name, id) {
        map.addMarker(position, name, id, false);
    };
    
    this.getMap = function() {
        return map;
    };
    
    this.displayProfile = function(profile, buttons) {
        nameDisplay.innerHTML = profile.name;
        imgDisplay.innerHTML = "<img id=\"userPhoto\" src=\"../images/profile" + profile.id + ".jpg\"></img>";
        if(buttons) {
            showButtons();
        } else {
            hideButtons();
        }
    };
    
    this.setCloseButtonCallback = function(cb) {
        closeButton.addEventListener("click", cb);
    };
    
    this.setConfirmButtonCallback = function(cb) {
        confirmButton.addEventListener("click", cb);
    };
    
    function showButtons() {
        confirmButton.style.display = "block";
        closeButton.style.display = "block";
    }
    
    function hideButtons() {    
        confirmButton.style.display = "none";
        closeButton.style.display = "none";
    }
    
    function isMatch() {
        return Math.random() >= 0.5;
    }
}