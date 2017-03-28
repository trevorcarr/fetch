/* global MatchmakingView */
/* global MatchmakingModel */
/* global Profile */
/* global Preference */

/* DUMMY DATA */
    var owner = new Profile("Joe Bloggs", 1);
    var walker1 = new Profile("JC Denton", 2);
    var walker2 = new Profile("Bert Sampson", 3);
    var walkers = [walker1, walker2];

var model = new MatchmakingModel(owner, walkers);
model.init();
var view = new MatchmakingView();
var controller = null;

function MatchmakingController() {
    
    var activeProfile = owner;
    
    view.addAttrInput("What is your dog's name?:" , "name", "text", "");
    view.addAttrInput("My dogs size", "dogSize", "range", "min=0 max=2");
    view.addAttrInput("My dogs energy level", "dogEnergy", "range", "min=0 max=2");
    view.addAttrInput("My preferred rate", "cashRate", "number", "value=0");
    view.addAttrInput("My dogs preferred walking distance (km)", "dogDist", "number", "value=1");
    view.addAttrInput("My dog likes children:", "childPref", "checkbox", "");
    view.addAttrInput("My dog plays with a ball:", "ballPref", "checkbox", "");
    view.addAttrInput("My dog needs a lead:", "leadPref", "checkbox", "");
    view.addAttrInput("My dog likes other dogs:", "otherDogPref", "checkbox", "");
    
    view.setOnSubmitForm(function() {
       var results = view.getResults();
       console.log("callback");
       console.log(results);
       
       for(i = 0; i < results.length; i++) {
           var result = results[i];
           var attribute = new Preference(result.name, i, result.value);
           console.log(attribute);
           owner.addAttribute(attribute);
       }
    });
    
    this.setActiveProfile = function(profile) {
        activeProfile = profile;
        update();
    };
    
    this.update = function() {
        view.update();
    };
}

controller = new MatchmakingController();