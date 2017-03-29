
function Profile(name, id, obj) {
    
    if(obj === null) {
        this.name = name;
        this.id = id;
        this.ratings = [];
        this.attributes = [];
        this.prefs = [];
        this.longitude = null;
        this.latitude = null;

        var ratingsNum = Math.floor((Math.random() * 10) + 1);

        for(i = 0; i < ratingsNum; i++) {
            this.ratings.push(Math.floor((Math.random() * 5)));
        }
    } else {
        this.name = obj.name;
        this.id = obj.id;
        this.ratings = obj.ratings;
        this.attributes = obj.attributes;
        this.prefs = obj.prefs;
        this.longitude = obj.longitude;
        this.latitude = obj.latitude;
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

    this.addAttributes = function(a) {
        this.attributes = this.attributes.concat(a);
    };

    this.addRating = function(r) {
        this.ratings.push(r);
    };
    
    this.setLocation = function(lat, long) {
        this.latitude = lat;
        this.longitude = long;
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
            score += this.ratings[i];
        }

        if(this.ratings.length > 0) {
            return score / this.ratings.length;
        } else {
            return -1;
        }
    };
}