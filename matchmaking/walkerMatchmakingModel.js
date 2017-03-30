function WalkerMatchmakingModel() {
    
    var profiles = JSON.parse(localStorage.getItem("profiles"));
    var activeProfile = profiles[0];
    profiles.splice(0, 1);
    var owner;
    
    this.getActiveProfile = function() {
        return activeProfile;
    };
    
    this.setOwner = function(o) {
        owner = o;
    };
    
    this.storeData = function() {
        localStorage.setItem("owner", JSON.stringify(owner));
        localStorage.setItem("walker", JSON.stringify(activeProfile));
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