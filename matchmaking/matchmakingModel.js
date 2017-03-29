
function MatchmakingModel() {
    
    var profiles = JSON.parse(localStorage.getItem("profiles"));
    var activeProfile = profiles[0];
    profiles.splice(0, 1);
    var walker;
    
    this.getActiveProfile = function() {
        return activeProfile;
    };
    
    this.setWalker = function(w) {
        walker = w;
    };
    
    this.storeData = function() {
        localStorage.setItem("walker", JSON.stringify(walker));
    };
    
    this.getProfiles = function() {
        return profiles;
    };
    
    this.getProfile = function(id) {
        for(var i = 0; i < profiles.length; i++) {
            if(profiles[i].id === id) {
                return profiles[i];
            }
        }
        return null;
    };
}