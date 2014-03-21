'use strict';



var devApp = angular.module('devApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'ngRoute',
  'restangular',
  'devApp.eventServices',
  'devApp.stageServices',
  'devApp.commentService',
  'devApp.userServices',
  'devApp.authFactory',
  'devApp.locationServices'
  ])
  .config( function($routeProvider,$locationProvider, $httpProvider) {

    $routeProvider.when('/',
      { controller:   'DashboardController',
        templateUrl:   '/views/dashboard.html'
    })
    .when('/login', {
        templateUrl: 'partials/login',
        controller: 'LoginCtrl'
      })
    /* New Event Routes */
    .when('/newEvent',{
      controller: 'NewEvController',
      templateUrl: '/views/newevent.html',
      authenticate: false
    })
    .when('/newEvent/addStages/:eventId',{
      controller: 'NewEventAddStagesController',
      templateUrl: '/views/addStages.html',
      authenticate: false
    })
    /* Event Routes */
    .when('/event/:eventId',{
        controller: 'EventController',
        templateUrl: 'views/event.html'
      })
    .when('/event/:eventId/settings',{
        controller: 'EventSettingsController',
        templateUrl: 'views/eventSettings.html'
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

    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
      return {
        'responseError': function(response) {
          if(response.status === 401 || response.status === 403) {
            $location.path('/login');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    }]);


   
  }).run(function ($rootScope, $location, Auth) {

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      
      if (next.authenticate && !Auth.isLoggedIn()) {
        $location.path('/login');
      }
    });
  });


  devApp.controller('MainController',
    function($scope){
    

      
    });





devApp.controller('SidebarController',
  function($scope, UserServices){
    $scope.user = UserServices.getUserImage();
   
  });



 
