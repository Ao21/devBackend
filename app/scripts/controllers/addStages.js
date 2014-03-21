devApp.controller('NewEventAddStagesController', 
  function($scope, $routeParams, $location,Events, EventStageServices){

    //$scope.event = Events.getAnEvent($routeParams.eventId).$object;
    //$scope.stageInfo = EventStageServices.getEventStages();

    $scope.removeItemFromStage = function(el){
      var a = arrayObjectIndexOf($scope.stageInfo, el.sId, 'sId')
      $scope.stageInfo.splice(a, 1);
      var a = arrayObjectIndexOf($scope.alternativeStages, el.sId, 'sId')
      $scope.alternativeStages[a].disabled=false;
    }

    $scope.finaliseEvent = function(){
      EventStageServices.submitEventStages($routeParams.eventId,$scope.stageInfo);
    }

    $scope.showAddNewStage = false;

    this.addEventStage = function(el){
      $scope.stageInfo.push(el);
    }

    this.hideAddNewStage = function(){
      $scope.showAddNewStage = false;
    }

    this.getCurrentEventStages = function(){
      return $scope.stageInfo;
    }

    this.checkIfStageAdded = function(el){
      var a = arrayObjectIndexOf($scope.stageInfo, el.sId, 'sId')
      if(a==-1){
        return false;
      }
      else{
        return true;
      }
    }

  });

devApp.directive('selectedStageList', function($routeParams,Events, EventStageServices){
  return{
    restrict: "E",
    templateUrl:function(tElement, tAttrs){ return 'partials/selectedStages.html'},
    link:function(scope,element,attrs,controller){
      scope.event = Events.getAnEvent($routeParams.eventId).$object;
      scope.stageInfo = EventStageServices.getEventStages();

    }
  }
})



devApp.directive('addNewStage', function () {
  return {
    restrict: 'A',
    replace: true,
    template: '<div class="grid__item stage newStage one-fifth push-half--ends"><div ng-click="toggleAddNewStage()" class="stage__box newStage"><p>Add a Stage</p></div></div>',
    link: function (scope, element, attr) {
      scope.toggleAddNewStage = function(el){
        scope.showAddNewStage = !scope.showAddNewStage;

      }
    }
  };
});

devApp.directive('eventItem', function(){
  return{
    restrict: "E",
    resplace: true,
    scope: {
      name:'@'
    },
    controller:'NewEventAddStagesController',
    template:''
  }
})


devApp.directive('alternativeStage', function($parse, EventTypeService, EventStageServices){
  return{
    restrict: "E",
    transclude: true,
    replace: true,
    controller:'NewEventAddStagesController',
    templateUrl:function(tElement, tAttrs){ return 'partials/stages/alternativeStage.html'},
    link: function(scope, element, attrs, evTypeCtrl ){
      //scope.eventTypes = EventTypeService.getAllEventTypes();
      
      scope.selectedIndex = 0;
      var allEventStageItems = EventStageServices.getAllEventStages();
      var thisEventStageItems = evTypeCtrl.getCurrentEventStages()
      var allStages = allEventStageItems;
      scope.alternativeStages = allStages;
      //updateStageDisabled();
      scope.itemClicked = function($index, el){
        //evTypeCtrl.setEventType(el);
        if(el.disabled!=true){
          if(evTypeCtrl.checkIfStageAdded(el)===false){
           evTypeCtrl.addEventStage(el);
           evTypeCtrl.hideAddNewStage();
           el.disabled =true;
         };
       }
     }
     function updateStageDisabled(){
      for (var b = 0; b < thisEventStageItems.length; b++) {
        console.log(thisEventStageItems[i]);
        for (var i = 0; i < scope.alternativeStages.length; i++) {
          console.log(scope.alternativeStages[i]);
          if(thisEventStageItems[b].sId === scope.alternativeStages[i].sId){
            scope.alternativeStages[i].disabled=true;
          }
        };
      };
    }
  }
}
});


function arrayObjectIndexOf(myArray, searchTerm, property) {
  for(var i = 0, len = myArray.length; i < len; i++) {
    if (myArray[i][property] === searchTerm) return i;
  }
  return -1;
}