
var model = new MatchmakingModel();
var view = new MatchmakingView(function(){});
var controller = null;

function MatchmakingController() {
    
    var activeProfile = model.getActiveProfile();
    view.addMainMarker(activeProfile.name, activeProfile.id);
    var map = view.getMap();
    var profiles = model.getProfiles();
    
    var interval_id = setInterval(function () {
            if(!map.getPosition()) {
                return;
            }
            for(var i = 0; i < profiles.length; i++) {
            var profile = profiles[i];
            var pos = map.getPosition();
            console.log(pos);
            var lat = pos.lat() + (Math.random() * 0.1);
            var long = pos.lng() + (Math.random() * 0.1);
            pos = {lat: lat, lng: long};
            view.addMarker(pos, profile.name, profile.id);
            
            clearInterval(interval_id);
    }
    
    map.setMarkerClickCallback(function(id) {
        view.displayProfile(model.getProfile(id));
    });
        },250);
}

controller = new MatchmakingController();

