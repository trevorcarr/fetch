/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


      function initMap() {
        var map = new Map('post_map');
        var path = (new Helper ()).getItemFromLocalStorage('path');
        
        map.setPathJson(path);
        tripStats(map);
        ownerName();
      }
      
      function tripStats(map) {
        distance = map.getLengthOfPathInM();
        distance = fixDistance(distance);
        document.getElementById("distance").innerHTML = "Distance: " + distance + " km";
        var duration = parseInt(JSON.parse((new Helper ()).getItemFromLocalStorage('time')));
        document.getElementById("minutes").innerHTML = "Time: " + parseInt(duration).formatTime();
        document.getElementById("price").innerHTML = "Price: " + "£" + (distance*10).toFixed(2);
        
        
      }
      
      function fixDistance(distance){
        distance = Math.round(distance);
        length = distance.toString().length;
        distance = (distance / 1000).toFixed(2);
        return distance;
        
      }
      
      function ownerName(){
          document.getElementById("howWere").innerHTML = "How were " + "" + "and " + "?";
      }
      window.addEventListener("load", initMap);