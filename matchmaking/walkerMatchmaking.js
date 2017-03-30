/*global MatchmakingView*/
/*global WalkerMatchmakingModel*/

var view = new MatchmakingView(function(){});
var model = new WalkerMatchmakingModel();

function WalkerMatchmaking() {
    
    var activeProfile = model.getActiveProfile();
    const myProfile = activeProfile;
    var button = document.getElementById("confirmUser");
    
    view.addMainMarker(myProfile.name, myProfile.id);
    view.displayProfile(myProfile, false);
    
    button.innerHTML = "WAITING";
    button.style.display = "block";
    
    var findOwner = function() {
        var profile = model.getProfiles()[0];
        view.displayProfile(profile, true);
        button.innerHTML = "ACCEPT";
        
        view.setConfirmButtonCallback(function() {
           model.setOwner(profile);
           model.storeData();
           window.location.replace("../walkCycle/walkCycle.html?role=walker");
        });
    };
    
    setTimeout(findOwner, 10000);
}

var wmm = new WalkerMatchmaking();