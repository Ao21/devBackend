devApp.controller('DashboardController', 
  function($scope, Events){

    $scope.dashboardEvents = Events.getEventsByUser().$object;




  });

