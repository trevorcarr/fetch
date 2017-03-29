
var model = new MatchmakingModel();
var view = new MatchmakingView(function(){});
var controller = null;

function MatchmakingController() {
    
    var activeProfile = model.getActiveProfile();
    const myProfile = activeProfile;
    
    view.addMainMarker(myProfile.name, myProfile.id);
    view.displayProfile(myProfile, false);
    
    view.setCloseButtonCallback(function() {
        view.displayProfile(myProfile, false);
        activeProfile = myProfile;
    });
    
    view.setConfirmButtonCallback(function() {
        model.setWalker(activeProfile);
        console.log(activeProfile);
        model.storeData();
        window.location.replace("../walkCycle/walkCycle.html?role=owner");
    });
    
    var map = view.getMap();
    var profiles = model.getProfiles();
    
    var interval_id = setInterval(function () {
            if(!map.getPosition()) {
                return;
            }
            for(var i = 0; i < profiles.length; i++) {
            var profile = profiles[i];
            var pos = map.getPosition();
            var lat = pos.lat() + ((Math.random()-0.5) * 0.05);
            var long = pos.lng() + ((Math.random()-0.5) * 0.05);
            pos = {lat: lat, lng: long};
            view.addMarker(pos, profile.name, profile.id);
            
            clearInterval(interval_id);
    }
    
    map.setMarkerClickCallback(function(id) {
        view.displayProfile(model.getProfile(id), true);
        activeProfile = model.getProfile(id);
    });
        },250);
}

controller = new MatchmakingController();

