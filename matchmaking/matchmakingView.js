
function MatchmakingView() {
    
    var cb_function = function(id) {
            document.getElementById("show_user").innerHTML = id;
    };
    
    var map;
    
    var inputs = [];
    var form = document.getElementById("dogAttr");
    var submitButton = document.getElementById("submit");
    
    this.addAttrInput = function(str, name, type, raw) {
        var input = {
            str : str,
            name : name,
            type: type,
            raw : raw
        };
        inputs.push(input);
        this.updateInputs();
    };
    
    this.setOnSubmitForm = function(cb) {
        submitButton.addEventListener("click", cb);
    };
    
    this.updateInputs = function(){
        form.innerHTML = "";
        for(i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            form.innerHTML += htmlInput(input);
        }
    };
    
    this.getResults = function() {
        return form.elements;
    };
    
    function htmlInput(input) {
        
        type = input.type;

        str = "<div id =\"" + input.name + "Input\">" + input.str
            + "<input type =\"" + type + "\" name=\"" + input.name + "\""
            +  input.raw + ">" 
            + "</div>";
            
        return str;
    };
}