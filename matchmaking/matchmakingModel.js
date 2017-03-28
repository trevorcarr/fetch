window.alert("this works");
        var cb_function = function(id) {
            document.getElementById("show_user").innerHTML = id;
        };
        // The cb_function is the function, that is called when a user_icon is clicked. It takes one argument.
        // In the call, the Argument is the id of the icon.
        // The idea is to make a callback function, that displays a user by id.
        var map = new Map('map_div', cb_function);
        
        //Get the current Position
        navigator.geolocation.getCurrentPosition(function (position) {     
            //generate a position that is close to the current position
            //(Reminder: Longitude is left / rigt)
            var position1 = new google.maps.LatLng(position.coords.latitude, position.coords.longitude + 0.005);
            // add a User marker with the generated Position
            map.addMarker(position1, "FH", 100);
            
            
        }, function () {
            handleLocationError(true, infoWindow, this.googleMap.getCenter());
        });
        