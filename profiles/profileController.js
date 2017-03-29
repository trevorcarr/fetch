/* global ProfikeView */
/* global ProfileModel */
/* global Profile */
/* global Preference */
/* global Form */
/* global google */

/* DUMMY DATA */
    var owner = new Profile("Joe Bloggs", 0);
    var walker1 = new Profile("JC Denton", 1);
    var walker2 = new Profile("Bert Sampson", 2);
    var walker2 = new Profile("Jane Doe", 3);
    walker1.setLocation(55.8, -4.2);
    walker2.setLocation(57, -4.5);
    var walkers = [walker1, walker2];

var model = new ProfileModel(owner, walkers);
model.init();
var view = new ProfileView();
var form = new Form();
form.addOption("What is your dog's name?:" , "name", "text", "");
form.init();
var controller = null;

function ProfileController() {
    
    var activeProfile = owner;
    
    for(var j = 0; j < form.options.length; j++) {
        view.addAttrInput(form.options[j]);
    }
    
    view.setOnSubmitForm(function() {
       var results = view.getResults();
       console.log(results);
       var attributes = [];
       
       for(i = 0; i < results.length; i++) {
           var result = results[i];
           var value;
           
           switch(result.type) {
               case "text":
                    if(result.value.length <= 0) {
                        alert("Please enter your dog's name.");
                        return;
                    } else if (result.value.length > 20) {
                        return;
                    }
                    value = result.value;
                    break;
                case "number":
                    value = parseFloat(result.value);
                    if(value < 0) {
                        return;
                    }
                    break;
                case "range":
                    value = parseFloat(result.value);
                    break;
                case "checkbox":
                    value = result.checked;
                    break;
            }
            
            var attribute = new Preference(result.name, i, value);
            console.log(attribute);
            attributes.push(attribute);
       }
       activeProfile.addAttributes(attributes);
       model.init();
       model.storeData();
       window.location.replace("../matchmaking/ownerMatchMaking.html");
    });
    
    this.setActiveProfile = function(profile) {
        activeProfile = profile;
        update();
    };
    
    this.update = function() {
        view.update();
    };
}

controller = new ProfileController();