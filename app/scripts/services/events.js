'use strict';

angular.module('devApp.eventServices', [])
  .factory('Events', function Events($http, Restangular, $location) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var _eventsService = Restangular.all('api/events/');
    var _eventService = Restangular.all('api/event/');


    return{ 
      getEventsByUser: function(userId){

        return _eventsService.getList();
      },
      getAnEvent: function(id){
         
         return  _eventService.one(id).get();
       
      },

      getAllEvents: function(){

        return _eventsService.getList();

      },

      createEvent: function(eventDetails){
       _eventsService.post(eventDetails).then(function(obj){
          console.log(obj);
          var url = '/newEvent/addStages/'+obj._id;
          $location.url(url);

       },function(){
        console.log('error');
       })
      }
    };

  }).factory('EventItems',function EventItems(Restangular){

  	var _eventItemService = Restangular.all('api/eventitem/');


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
  	
  })
  .factory('EventTypeService',function EventTypeService(Restangular){
    return{
      getAllEventTypes: function(){

        var dummyEventTypes = ['Lecture','Award Ceremony', 'Conference', 'Workshop', 'Exhibitions','Information Night']
        return dummyEventTypes;
      }
    }
  })
  .factory('EventStageServices',function EventStageServices(Restangular){
    var _eventStageService = Restangular.all('api/event/');

    return{
      getEventStages: function(){

              var defaultLectureStages = [{name:   'Initial Stage',sId:     0,type:   'Default',userGroups: ['default','approvers'],defaultColor: 'yellow',removable: false, disabled: true, stageItems: ['Name','Description','Location','Staff Involved']},{name: 'Facilities Stage',disabled: true,sId:     1,type: 'Default',userGroups: ['default','facilities','approvers'],defaultColor: 'green',removable: true,stageItems: ['Room Bookings','Equipment Bookings']},{name: 'Marketing Stage',disabled: true, sId:     2,type: 'Default',userGroups: ['default','marketing','approvers'],defaultColor: 'blue',removable: true,stageItems: ['Sydney Uni Events','Email Campaign','Posters','Microsite']}];

              return defaultLectureStages;

      },
      getAllEventStages: function(){

        var dummyStageInfo = [
        {name:   'Initial Stage',sId:     0,type:   'Default',disabled: true, userGroups: ['default','approvers'],defaultColor: 'yellow',removable: false,stageItems: ['Name','Description','Location','Staff Involved']},
        {name: 'Facilities Stage',sId:     1,type: 'Default',disabled: true,userGroups: ['default','facilities','approvers'],defaultColor: 'green',removable: true,stageItems: ['Room Bookings','Equipment Bookings']},
        {name: 'Marketing Stage',sId:     2,type: 'Default',disabled: true,userGroups: ['default','marketing','approvers'],defaultColor: 'blue',removable: true,stageItems: ['Sydney Uni Events','Email Campaign','Posters','Microsite']},
        {name:   'Budgeting',sId:     3,type:   'Default',userGroups: ['default','approvers'],defaultColor: 'yellow',removable: true,stageItems: ['Name','Description','Location','Staff Involved']},
        {name:   'Audio Visual',sId:     4,type:   'Default',userGroups: ['default','approvers'],defaultColor: 'yellow',removable: true,stageItems: ['Name','Description','Location','Staff Involved']},
        {name:   'Social Media',sId:     5,type:   'Default',userGroups: ['default','approvers'],defaultColor: 'yellow',removable: true,stageItems: ['Name','Description','Location','Staff Involved']},
        {name:   'Photography' ,sId:     6,type:   'Default',userGroups: ['default','approvers'],defaultColor: 'yellow',removable: true,stageItems: ['Name','Description','Location','Staff Involved']}];

        return dummyStageInfo;
      },
      submitEventStages: function(eventId, eventStages){
        console.log(eventStages);
        var myJsonString = JSON.stringify(eventStages);
        console.log(myJsonString);

        _eventStageService.one(eventId).one('addstages').post(myJsonString);
      }
    }
  })
