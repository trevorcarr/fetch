
function ProfileView() {
    
    var cb_function = function(id) {
            document.getElementById("show_user").innerHTML = id;
    };
    
    var map;
    
    var inputs = [];
    var form = document.getElementById("dogAttr");
    var submitButton = document.getElementById("submit");
    
    this.addAttrInput = function(input) {
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
            form.innerHTML += "\n";
        }
    };
    
    this.getResults = function() {
        return form.elements;
    };
    
    function htmlInput(input) {
        
        type = input.type;

        str = "<div class=\"formInput\" id =\"" + input.name + "Input\">" + input.str
            + "<br><input type =\"" + type + "\" name=\"" + input.name + "\""
            +  input.raw + ">" 
            + "</div>";
    
            
        return str;
    };
}