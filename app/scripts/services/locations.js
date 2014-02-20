'use strict';

angular.module('devApp.locationServices', [])
  .service('LocationServices', function LocationServices($http, Restangular) {
    // AngularJS will instantiate a singleton by calling "new" on this function



    var locations = [{'name':'The Hearth','imagePath':'/images/hearth.jpg'},
                    {'name':'East Wing','imagePath':'/images/hearth.jpg'}
    ];

    return{
      getLocations: function(){
        return locations;
      },
      checkIfBooked: function(location,time){
        return false;
      }
    };

  });
