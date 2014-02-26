'use strict';

angular.module('devApp.locationServices', [])
  .service('LocationServices', function LocationServices($http, Restangular) {
    // AngularJS will instantiate a singleton by calling "new" on this function



    var locations = [{'id':0,'text':'The Hearth','name':'The Hearth','imagePath':'/images/hearth.jpg','capacity':500},{'id':1,'text':'East Wing','name':'East Wing','imagePath':'/images/hearth.jpg', 'capacity':1000}];

    return{
      getLocations: function(){
        return locations;
      },
      checkIfBooked: function(location,time){
        return false;
      }
    };

  });
