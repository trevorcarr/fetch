
function Profile(name, id) {
    
    this.name = name;
    this.id = id;
    this.ratings = [];
    this.attributes = [];
    this.prefs = [];
}

this.getPrefs = function() {
    return this.prefs;
};

this.getAttributes = function() {
    return this.attributes;
};

this.addPref = function(p) {
    this.prefs.push(p);
};

this.addAttribute = function(a) {
    this.attributes.push(a);
};

this.addRating = function(r) {
    this.ratings.push(r);
};

this.removePref = function(id) {
    removeFromArray(this.prefs, id);
};

this.removeAttribute = function(id) {
    removeFromArray(this.attributes, id);
};

function removeFromArray(arr, id) {
    for(i = 0; i < arr.length; i++) {
        var element = arr[i];
        if (element.id === id) {
            arr.splice(i, 1);
            return;
        }
    }
}

this.getScore = function() {
    var score = 0;
    
    for(i = 0; i < this.ratings.length; i++) {
        score += ratings[i];
    }
    
    if(ratings.length > 0) {
        return score / this.ratings.length;
    } else {
        return -1;
    }
};