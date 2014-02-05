devApp.controller('TestController', 


  function($scope, $timeout, Events,Restangular, Stages, Comments, EventItems){

    

    $scope.events = Events.getAnEvent().$object;

    $scope.go = function() {

      $scope.$watch('events',function(i){
        var e = i[0]._id;
        Stages.linkStageToEvent(e, 'initial stage');
      });
    }


    /* Stage */
    $scope.createStage = function() {
      Stages.createStage('Initial Stage', 'Normal', 'General');
      
      
    }


    $scope.updateStage = function() {
      Stages.updateStage();
      
      
    }


    $scope.listStages = function(){
      $scope.stages = Stages.listStages().$object;
      
    }


    $scope.updateStageUsergroups = function() {
      var us= ["mrTalk"];
      Stages.updateStageUsergroups('52f07fc71caf45bc43000009',us);
      
    }


    /* Comments*/
    
    $scope.addComment = function(){
      var comment = {
        author: 'Ro',
        content:$scope.comment.input,
        status: 'Normal',
        type: 'eventItem',
        relatedTo: $scope.comment.relatedTo
      }

      console.log(comment);

      Comments.addCommentTo(comment,'dummy item');
      
    }


    /* Event Items */


    $scope.addEventItem = function(){
      var eventItem = {
        name: $scope.eventItem.name,
        content: $scope.eventItem.content,
        type: $scope.eventItem.type,
        status:$scope.eventItem.status
      }

      console.log(eventItem);

      EventItems.addAnEventItem(eventItem,'stageId','eventId');

    }

    $scope.getEventItems = function(){
      $scope.eventItems = EventItems.getAllEventItems().$object;
    }


    $scope.createEvent = function(){
      var newEvent = {
        name: $scope.event.name,
        author: 'Ro',
        type : $scope.event.type,
        staff: ['Ro', 'Anne Marie']
      }

      Events.createEvent(newEvent);
    }
    

    $scope.findComments = function(){
     var c = Comments.getComments($scope.comment.id).$object;
     $scope.comments = c;
   }

   var timeout;
   $scope.$watch('username',function(newUsername){
    if(newUsername){
      if(timeout){
        $timeout.cancel(timeout);
      }
      timeout = $timeout(function(){
        $scope.events = Events.getOutstandingTasksByEvent(newUsername);
        $scope.eventInfo = Events.getAnEvent();
      },250);
    }
    
    
  });
 });