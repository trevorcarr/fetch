/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var newRating;

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
              document.getElementById("howWere").innerHTML = "How was " 
                      + JSON.parse((new Helper ()).getItemFromLocalStorage('walker_name')) + "?";
          } else {
              document.getElementById("howWere").innerHTML = "How were " 
                      + JSON.parse((new Helper ()).getItemFromLocalStorage('dog_name')) + " and " 
                      + JSON.parse((new Helper ()).getItemFromLocalStorage('owner_name')) + "?";
          }
      }
      
      function calculateAverageReview(){
          var average_rating = JSON.parse((new Helper ()).getItemFromLocalStorage('avg_rating'));
          console.log(average_rating);
          var number_of_ratings = JSON.parse((new Helper ()).getItemFromLocalStorage('ratings'));
          var total = average_rating * number_of_ratings;
          total += newRating;
          number_of_ratings++;
          average_rating = total/number_of_ratings;
          localStorage.setItem('avg_rating', average_rating);
          localStorage.setItem('ratings', number_of_ratings);
      }
      
      function rate(rating){
          newRating = rating;
      }
      
      function submit(){
          calculateAverageReview();
          
      }
      window.addEventListener("load", init);