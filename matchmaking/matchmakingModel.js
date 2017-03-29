
function MatchmakingModel() {
    
    var profiles = JSON.parse(localStorage.getItem("profiles"));
    var activeProfile = profiles[0];
    profiles.splice(0, 1);
    
    this.getActiveProfile = function() {
        return activeProfile;
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