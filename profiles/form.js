
function Form() {
    
    this.options = [];
    
    this.init = function() {
        this.addOption("My dogs size:", "dogSize", "range", " min=\"0\" max=\"2\"");
        this.addOption("My dogs energy level:", "dogEnergy", "range", " min=\"0\" max=\"2\"");
        this.addOption("My preferred rate (£ / km):", "cashRate", "number", "value=0");
        this.addOption("My dogs preferred walking distance (km):", "dogDist", "number", "value=1");
        this.addOption("My dog likes children:", "childPref", "checkbox", "value=\"off\"");
        this.addOption("My dog plays with a ball:", "ballPref", "checkbox", "value=\"off\"");
        this.addOption("My dog needs a lead:", "leadPref", "checkbox", "value=\"off\"");
        this.addOption("My dog likes other dogs:", "otherDogPref", "checkbox", "value=\"off\"");
    };
    
    this.addOption = function(str, name, type, raw) {
        var input = {
            str : str,
            name : name,
            type: type,
            raw : raw
        };
        this.options.push(input);
    };
}