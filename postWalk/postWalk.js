/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


      function initMap() {
        var map = new Map('post_map');
        var path = (new Helper().getUrlParameter('path'));
//        console.log(decodeURI(path));
        map.setPathJson(decodeURIComponent(path));
        tripStats(map);
      }
      
      function tripStats(map) {
        distance = map.getLengthOfPathInM();
        distance = fixDistance(distance);
        document.getElementById("distance").innerHTML = "Distance: " + distance + " km";
        document.getElementById("minutes").innerHTML = "Minutes: " ;
        console.log(distance);
        document.getElementById("price").innerHTML = "Price: " + "£" + (distance*10);
        
        
      }
      
      function fixDistance(distance){
        distance = Math.round(distance);
        length = distance.toString().length;
        distance = (distance / 1000).toFixed(2);
        return distance;
        
      }
      window.addEventListener("load", initMap);