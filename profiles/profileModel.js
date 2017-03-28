/* global profile */

function ProfileModel(ownerProfile, walkerProfiles) {
    
    this.ownerProfile = ownerProfile;
    this.walkerProfiles = walkerProfiles;
    
    this.scoreMap;
    
    this.init = function() {
        this.scoreMap = this.sortProfiles(this.ownerProfile, this.walkerProfiles);
    };
    
    this.storeData = function() {
        localStorage.setItem("owner", JSON.stringify(ownerProfile));
        localStorage.setItem("walkers", JSON.stringify(walkerProfiles));
        localStorage.setItem("scores", JSON.stringify(scoreMap));
    };
    
    this.sortProfiles = function(ownerProfile, walkerProfiles) {
        
        const ownerPrefs = ownerProfile.getPrefs();
        const dogAttributes = ownerProfile.getAttributes();

        var scores = [];

        for(i = 0; i < walkerProfiles.length; i++) {
            const walkerProfile = walkerProfiles[i];
            const walkerAttributes = walkerProfile.getAttributes();
            const walkerPrefs = walkerProfile.getPrefs();
            var score = 0;

            for(j = 0; j < walkerPrefs.length; j++) {
                const pref = walkerPrefs[j];
                const attr = dogAttributes[j];

                score += comparePref(pref, attr);
            }

            for(j = 0; j < walkerPrefs.length; j++) {
                const pref = ownerPrefs[j];
                const attr = walkerAttributes[j];

                score += comparePref(pref, attr);
            }
            scores[i] = score;
        }
        //TODO sort walkerProfiles based on scores
        var map = new Map();

        for(i = 0; i < walkerProfiles.length; i++) {
            map.set(walkerProfiles[i], scores[i]);
        }

        return map;
    };

    this.comparePref = function(pref, attr) {

        if(pref.type === attr.type){
            switch(pref.type) {
                case "number":
                    return 3 - (abs(pref.value - attr.value));
                    break;
                case "string":
                    var p = pref.value.toLowerCase().trim();
                    var a = attr.value.toLowerCase().trim();

                    if(p ===  a) {
                        return 3;
                    } else {
                        return 0;
                    }
                    break;
                case "boolean":
                    if(pref.value === attr.value) {
                        return 1;
                    } else {
                        return -1;
                    }
                    break;
            }
        } else {
            return 0;
        }
    };

    this.addWalker = function(walker) {
        this.walkerProfiles.push(walker);
        update();
    };

    this.removeWalker = function(walker) {
        const index = this.walkerProfiles.indexOf(walker);
        if(index > -1) {
           this.walkerProfiles.splice(index, 1);
           update();
        }
    };

    this.update = function() {
        this.scoreMap = sortProfiles(this.ownerProfile, this.walkerProfiles);
    };
}

