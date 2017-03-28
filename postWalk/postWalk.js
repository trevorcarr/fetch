/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


      function initMap() {
        var map = new Map('post_map');
        var path = (new Helper().getUrlParameter('path'));
        console.log(decodeURI(path));
        map.setPathJson(decodeURIComponent(path));
      }
      
      window.addEventListener("load", initMap);