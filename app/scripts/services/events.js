'use strict';

angular.module('devApp.eventServices', [])
  .factory('Events', function Events($http, Restangular) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var _eventsService = Restangular.all('events/');


    return{
      getAnEvent: function(){
        
         return _eventsService.getList();

       
      },

      createEvent: function(eventDetails){
       _eventsService.post(eventDetails).then(function(obj){
          console.log(obj);
       },function(){
        console.log('error');
       })
      }
    };

  }).factory('EventItems',function EventItems(Restangular){

  	var _eventItemService = Restangular.all('eventitem/');


  	return{

  		getAllEventItems: function(){
  			return _eventItemService.getList();
  		},

      
  			

  		createAnEventItemType: function(eventItemType){},
  		/* Adds an Event Item to a Stage*/
  		addAnEventItem : function(eventItem, stageId, eventId){
  			var eItemPost={
  				eventItem : eventItem,
  				stageId : stageId,
  				eventId : eventId
  			};

  			_eventItemService.post(eItemPost).then(function(obj){
  				console.log(obj);
  			},function(){
  				console.log('ERROR');
  			});
  		},

  		}
  	
  });