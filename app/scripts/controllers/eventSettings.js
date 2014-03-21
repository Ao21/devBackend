devApp.controller('EventSettingsController', 
  function($scope, $routeParams, $location,Events){


    $scope.event = Events.getAnEvent($routeParams.eventId).$object;

    console.log($scope.event);
    

  });