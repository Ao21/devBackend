/*=============================================
=            New Event Controllers            =
=============================================*/



devApp.controller('NewEvController', 
  function($scope, EventTypeService){


    $scope.locationList = [];

    this.getLocLength = function(){
      //return $scope.locationList.length;
    }


    

    


    this.setEventType = function(e){
    	console.log(e);
    	$scope.$parent.chosenEventType = e;
    }


    

    
    this.addNewLocation = function(val){
      var nVal = _.clone(val);
      var doesThisExist = _.find($scope.$parent.locationList,{'locId':val.locId});
      if(!doesThisExist){
        $scope.$parent.locationList.push(nVal);
      }
    }


    $scope.submitForm = function() {

			// check to make sure the form is completely valid
			if ($scope.userForm.$valid) {
				alert('our form is amazing');
			}

		};





  });


/*-----  End of New Event Controllers  ------*/




/**
*
* Event Type Directives
* Creates Event Types from the event section grid
*
*
**/

devApp.directive('myBlur', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.bind('blur', function () {
                //apply scope (attributes)
                scope.$apply(attr.myBlur);
                //return scope value for focusing to false
                scope.$eval(attr.myFocus + '=false');
            });
        }
    };
});



devApp.directive('eventTypeGrid',function(){
  return {
    restrict: "E",
    replace: true,
    transclude: true,
    scope:{
      type:'@'
    },
    controller:'NewEvController',
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
    template:   '<div ng-repeat="eventType in eventTypes" ng-click="itemClicked($index, this.eventType)" class="grid__item one-fifth"><div class="eventType"  ng-class="{ active : $index == selectedIndex }"><div class="outerContainer"><div class="innerContainer"><p>{{eventType}}</p></div></div></div></div>',
    link: function(scope, element, attrs, evTypeCtrl ){
      scope.eventTypes = EventTypeService.getAllEventTypes();

      scope.selectedIndex = 0;

      scope.itemClicked = function($index, el){
      	evTypeCtrl.setEventType(el);
      	scope.selectedIndex = $index;
      }


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
    template:function(tElement, tAttrs){ return '<label>Select a date</label><datepicker ng-model="thisDate"></datepicker><label>Select a Location</label><location-dropdown ng-model="area" id=""></location-dropdown><i ng-click="newEntry()" class="fa fa-check-circle-o"></i>'},
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
    template: '<i ng-click="newLoc()" class="fa fa-plus-circle push--right"></i>',
    replace:true,
    link: function(scope,element, attrs){
      var userNo =0;
      scope.newLoc = function(){
        var newElement = angular.element(document.createElement('location'));
        newElement.attr('userName', userNo);
        var el = $compile(newElement)(scope);
        element.parent().prepend(el);
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









/**
*
* Blur Directive
*
**/



var blurFocusDirective = function () {
    return {
        restrict: 'E',
        require: '?ngModel',
        link: function (scope, elm, attr, ctrl) {
            if (!ctrl) {
                return;
            }

            elm.on('focus', function () {
                elm.addClass('has-focus');

                scope.$apply(function () {
                    ctrl.hasFocus = true;
                });
            });

            elm.on('blur', function () {
                elm.removeClass('has-focus');
                elm.addClass('has-visited');

                scope.$apply(function () {
                    ctrl.hasFocus = false;
                    ctrl.hasVisited = true;
                });
            });

            elm.closest('form').on('submit', function () {
                elm.addClass('has-visited');

                scope.$apply(function () {
                    ctrl.hasFocus = false;
                    ctrl.hasVisited = true;
                });
            });

        }
    };
};

devApp.directive('input', blurFocusDirective);
devApp.directive('textarea', blurFocusDirective);