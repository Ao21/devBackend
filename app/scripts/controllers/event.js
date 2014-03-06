devApp.controller('EventController', 
  function($scope, $routeParams, $location,Events){


    var c = Events.getAnEvent($routeParams.eventId).$object;
    console.log(c);

  });