/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


      function initMap() {
        var map = new Map('post_map');
        var path = (new Helper().getUrlParameter('path'));
        map.setPathJson(path);
        tripStats(map);
      }
      
      function tripStats(map) {
        distance = map.getLengthOfPathInM();
        distance = fixDistance(distance);
        document.getElementById("distance").innerHTML = "Distance: " + distance + " km";
        var duration = (new Helper().getUrlParameter('time'));
        document.getElementById("minutes").innerHTML = "Time: " + parseInt(duration).formatTime();
        document.getElementById("price").innerHTML = "Price: " + "£" + (distance*10).toFixed(2);
        
        
      }
      
      function fixDistance(distance){
        distance = Math.round(distance);
        length = distance.toString().length;
        distance = (distance / 1000).toFixed(2);
        return distance;
        
      }
      window.addEventListener("load", initMap);