'use strict';

angular.module('devApp.stageServices', [])
  .factory('Stages',function Stages(Restangular){

    var stages = Restangular.all('stage');
          
    return{
      linkStageToEvent: function(eventId, stage){
       
        var reply = {
            stage: stage,
            id: eventId
          }
       
        stages.all('link').post(reply).then(function(obj) {
            console.log(obj);
          }, function() {
            console.log("There was an error saving");
          });
      },

      listStages: function(){

        return stages.getList();
       
      },

      createStage: function(name, type, usergroup){
        
        var stage = {
          name : name,
          type : type,
          usergroup  : usergroup
        }

        stages.post(stage).then(function(obj) {
            console.log(obj);
          }, function() {
            console.log("There was an error saving");
          });


      },

      updateStage: function(updateArray){
        var uArray = {
          id: id,
          type: 'different'
        };

        stages.all('update').post(uArray).then(function(obj) {
          }, function() {
            console.log("There was an error saving");
          });
      },

      updateStageUsergroups: function(id, usergroups){
        var ugArray = {id: id, usergroups: usergroups};
        console.log(ugArray);

        stages.all('update').all('usergroups').post(ugArray).then(function(obj) {
          }, function() {
            console.log("There was an error saving");
          });
      }
    }
    
  });


