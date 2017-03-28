
function Preference(name, id, value) {
    
    this.name = name;
    this.id = id;
    this.value = value;
    this.type = typeof(value);
}