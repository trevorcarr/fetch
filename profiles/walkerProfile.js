/*global Profile*/

var owner1 = new Profile("JC Denton", 1, null);
var owner2 = new Profile("Bert Sampson", 2, null);
var owner3 = new Profile("Jane Doe", 3, null);
var owners = [owner1, owner2, owner3];

function WalkerProfile() {
    
    var submitButton = document.getElementById("submit");
    var walkerName = document.getElementById("walkerName");
    
    submitButton.addEventListener("click", function() {
        if(walkerName.value !== "") {
            var walker = new Profile(walkerName.value, 0, null);
            localStorage.setItem("walker", JSON.stringify(walker));
            localStorage.setItem("owners", JSON.stringify(owners));
            window.location.replace("../matchmaking/walkerMatchMaking.html");
        }
        else{
            alert("Please enter your name.");
        }
    });
}

var w = new WalkerProfile();