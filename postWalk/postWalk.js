/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


      function init() {
        var map = new Map('post_map');
        var path = (new Helper ()).getItemFromLocalStorage('path');
        map.setPathJson(path);
        tripStats(map);
        name();
      }
      
      function tripStats(map) {
        distance = map.getLengthOfPathInM();
        distance = fixDistance(distance);
        document.getElementById("distance").innerHTML = distance + " km";
        var duration = parseInt(JSON.parse((new Helper ()).getItemFromLocalStorage('time')));
        document.getElementById("minutes").innerHTML =  parseInt(duration).formatTime();
        document.getElementById("price").innerHTML = "£" + (distance*10).toFixed(2);
      }
      
      function fixDistance(distance){
        distance = Math.round(distance);
        length = distance.toString().length;
        distance = (distance / 1000).toFixed(2);
        return distance;
        
      }
      
      function name(){
          if(window.location.pathname.split("/").slice(-1)[0] == 'postWalkOwner.html'){
              document.getElementById("howWere").innerHTML = "How was " + "?";
          } else {
              document.getElementById("howWere").innerHTML = "How were " + "" + "and " + "?";
          }
      }
      
      function calculateAverageReview(){
          //get owner/ walker current rating 
          //multiply by the number of ratings
          //add the new rating 
          //divide by number of ratings plus one
          //return rating
      }
      window.addEventListener("load", init);