
/**
*
* New Event Creation Controller
*
**/




devApp.controller('NewEvController', 
  function($scope, EventTypeService){


    $scope.locationList = [];

    this.getLocLength = function(){
      //return $scope.locationList.length;
    }


    

    console.log($scope.eventTypeList);


    

    
    this.addNewLocation = function(val){
      var nVal = _.clone(val);
      var doesThisExist = _.find($scope.$parent.locationList,{'locId':val.locId});
      if(!doesThisExist){
        $scope.$parent.locationList.push(nVal);
      }
    }





  });



devApp.controller('eventTypeController', function($scope){
  var ctrl = this,
  eventTypes = ctrl.eventTypes = $scope.eventTypes = [];

  ctrl.select = function(selectedEventType){
    angular.forEach(eventTypes, function(eventType){
      if(eventType.active && eventType !== selectedEventType){
        eventType.active = false;
        eventType.onDeselect();
      }
    });
    selectedEventType.active = true;
    selectedEventType.onSelect();
  }


});


devApp.directive('eventTypeGrid',function(){
  return {
    restrict: "E",
    replace: true,
    transclude: true,
    scope:{
      type:'@'
    },
    controller:'eventTypeController',
    template: '<div class="grid"><event-type-directive></event-type-directive></div>'
  }
})

devApp.directive('eventTypeDirective', function($parse, EventTypeService){
  return{
    require:'^eventTypeGrid',
    restrict: "E",
    replace: true,
    scope:{
      active: '=?',
      heading: '@',
      onSelect: '&select',
      onDeselect: '&deselect'
    },
    template:   '<div ng-repeat="eventType in eventTypeList" disabled="eventType.disabled" active="eventType.active" class="grid__item one-fifth"><div class="eventType"><div class="outerContainer"><div class="innerContainer"><p>{{eventType}}</p></div></div></div></div>',
    link: function(scope, element, attrs, evTypeCtrl ){
      scope.eventTypeList = EventTypeService.getAllEventTypes();

      scope.$watch('active', function(active) {
          if (active) {
            evTypeCtrl.select(scope);
          }
        });

      scope.disabled = false;
        if ( attrs.disabled ) {
          scope.$parent.$watch($parse(attrs.disabled), function(value) {
            scope.disabled = !! value;
          });
        }

        scope.select = function() {
          if ( !scope.disabled ) {
            console.log('hi');
            scope.active = true;
          }
        };


    }
}
});


/**
*
* Location Directive
* Creates the Add a Location Directive that allows the user to select a date + location
* Future: Will Check in the locations service whether that time/area has already been selected.
*
* Returns an Object with
* locObject.locId
* locObject.date
* locObject.area.name
* locObject.area.imshrPath
*
**/


devApp.directive('location',function($compile,LocationServices){
  return {
    restrict: "E",
    scope:{
      username: '='
    },
    replace:false,
    controller:'NewEvController',
    template:function(tElement, tAttrs){ return '<p id="'+tAttrs.username+' {{username}}">New Location</p><datepicker ng-model="thisDate"></datepicker><location-dropdown ng-model="area" id=""></location-dropdown><p>Date: {{thisDate | date:"medium"}}</p><button ng-click="newEntry()">Add Location</button>'},
    link: function(scope,element,attrs,controller){
      var lastDate = '';
      scope.newEntry = function(){
        var locObject = {
          locId:'loc'+scope.username,
          date:scope.thisDate,
          area:scope.area
        };
        controller.addNewLocation(locObject);
      }
    }
  }
});


/**
*
* Add a Location Button Directive
*
* Creates a button that adds a location with an Id
*
**/


devApp.directive('addLocation',function($compile){
  return{
    restrict: "E",
    template: '<button ng-click="newLoc()">Add Location</button>',
    replace:true,
    link: function(scope,element, attrs){
      var userNo =0;
      scope.newLoc = function(){
        var newElement = angular.element(document.createElement('location'));
        newElement.attr('userName', userNo);
        var el = $compile(newElement)(scope);
        element.parent().append(el);
        userNo++;
      }

    }
  }
})


/**
*
* Creates  Location Dropdown Select Button with Locations taken from the Locations Services
*
**/


.directive('locationDropdown',
  function($compile, LocationServices){
   return{
    restrict: "E",
    replace:true,
    template:'<select ng-options="l.name for l in locations"></select>',
    link: function($scope, element, attrs){
      $scope.locations = LocationServices.getLocations();
    }
  }
})







/* 
.directive('newLocation',function($compile,LocationServices){
   return{
    restrict: "E",
    replace:true,
    require: '^ngController',
    scope:{
      ngModel: '='
    },
    template:"<p ng-click='add()'>Add a new location</p>",
    link: function($scope, element, attrs, topCtrl){
      var locNo= 0, previousLocationDates="";
      $scope.add = function(ev, attzrs){

        var a = angular.element('<div ng-model="newLocation" class="newlocation">
          <datepicker ng-model="location.dates" id="{{date}}" ng-value="dates"></datepicker>
          <location-dropdown ng-model="location.area" id="'+locNo+'"></location-dropdown></div>');
        var el = $compile(a) ($scope);
        angular.element(element.parent()).append(a);
        //$scope.insertHere = a;


        locNo++;
        

      }

      $scope.$watch('location',function(val){
        
          if(val && previousLocationDates!= val){
            console.log(val.name);
            //topCtrl.updateLocations(val);
            //previousLocationDates === val;
            }

          
        })
    }
  }
})



  .directive('myDirective', function($compile) {
    return {
    require: 'ngModel',
    restrict: 'E',
    template: '<p ng-click="add()">Add a Location</p>',
    replace: true,
    scope:{
      ngModel : '='
    },
    

    link: function($scope, element, attrs, NewEvController){
      var locNo= 0;

      $scope.add = function(ev,attrs){
          var datepicker = angular.element(document.createElement('datepicker'));
          var ngModelId = 'location' + locNo + '.date';
          datepicker.attr('ng-model',ngModelId);
          var el = $compile( datepicker ) ($scope);
          angular.element(document.body).append(datepicker);

          $scope.insertHere = el;
          locNo++;

        };

        $scope.$watch('ngModel',function(v){
         console.log(v);
        })

       



    }

    }
});



 .directive('nLoc',function($scope){
    return{
      template: '<p>Add a Location</p>',
      restrict: 'A',
      replace: false,
      link: function($scope, element, attrs){
        $scope.add = function(ev,attrs){
          var datepicker = angular.element(document.createElement('datepicker'));
          var ngModelId = 'locationID' + locNumber;
          datepicker.attr('ng-model','location.date');
          var el = $compile( datepicker ) ($scope);
          angular.element(document.body).append(datepicker);

          $scope.insertHere = el;
        };

      }
    }

  });

  */
