'use strict';



var devApp = angular.module('devApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'restangular',
  'devApp.eventServices',
  'devApp.stageServices',
  'devApp.commentService',
  'devApp.userServices',
  'devApp.locationServices',
  'ngQuickDate'
  ])
  .config( function($routeProvider,$locationProvider) {

    $routeProvider.when('/',
      { controller:   'DashboardController',
        templateUrl:   '/views/dashboard.html'
    })
    .when('/event/newEvent',{
      controller: 'NewEvController',
      templateUrl: '/views/newevent.html'
    })
    .when('/event/newEvent2',{
      controller: 'newLocation',
      templateUrl: '/views/newLocation.html'
    })
    .when('/blah',
      {
      controller: 'TestController',
      templateUrl: '/views/testing.html'
    }).
    otherwise({redirectTo:'/'});
    $locationProvider.html5Mode(false);


   
  });


  devApp.controller('MainController',
    function($scope){
    

      
    });





devApp.controller('SidebarController',
  function($scope, UserServices){
    $scope.user = UserServices.getUserImage();
   
  });



 
