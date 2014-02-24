/*=============================================
=            New Event Controllers            =
=============================================*/



devApp.controller('NewEvController', 
  function($scope, EventTypeService){


  	$scope.onceOrSeriesToggle= true;

    $scope.locationList = [];

    this.getLocLength = function(){
      //return $scope.locationList.length;
    }


    

    this.setEventType = function(e){
    	$scope.$parent.chosenEventType = e;
    }


    

    
    this.addNewLocation = function(val){
      var nVal = _.clone(val);
      var doesThisExist = _.find($scope.$parent.locationList,{'locId':val.locId});
      if(!doesThisExist){
        $scope.$parent.locationList.push(nVal);
      }
      else{
      	var a = _.indexOf($scope.$parent.locationList,{'locId':val.locId});
			$scope.$parent.locationList.splice(a, 1);
      	$scope.$parent.locationList.push(val);

      }
    }


    $scope.submitForm = function() {

			// check to make sure the form is completely valid
			if ($scope.userForm.$valid) {
				alert('our form is amazing');
			}

		};


		$scope.onceOrSeries = function(){
			$scope.onceOrSeriesToggle = !$scope.onceOrSeriesToggle;
		}


		$


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

/*

 devApp.config(function(ngQuickDateDefaultsProvider) {
    ngQuickDateDefaultsProvider.set('parseDateFunction', function(str) {
      d = Date.create(str);
      return d.isValid() ? d : null;
    });
  })
*/
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
      locId: '='
    },
    replace:false,
    controller:'NewEvController',
    template:function(tElement, tAttrs){ return '<label>Select a date</label><date-picker ng-model="thisDate"></date-picker><label>Pick a time</label><time-picker ng-model="thisTime"></time-picker><label>Select a Location</label><location-dropdown ng-model="area" id=""></location-dropdown><i  ng-click="newEntry()" class="fa fa-check-circle-o"></i>'},
    link: function(scope,element,attrs,controller){
      var lastDate = '';

      scope.isDisabled = false;


       scope.$watch('[thisDate, thisTime, area]', function (a) {
	       if(a[0] && a[1] && a[2]){
	       	scope.isDisabled = true;

	       }
	        }, true);

      scope.newEntry = function(){
      	if(scope.isDisabled===true){
	      	if(scope.thisDate.obj && scope.thisTime.hour){
		      	var d = moment(scope.thisDate.obj);
		      	d.hour(scope.thisTime.hour);
		      	d.minute(scope.thisTime.mins);
		      }


	        var locObject = {
	          locId:'loc'+attrs.locid,
	          date:d,       
	          area:scope.area
	        };
	       
	        LocationServices.checkIfBooked(d,scope.area.name)
	        controller.addNewLocation(locObject);
	    }
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
      var locNo =1;
      scope.newLoc = function(){
        var newElement = angular.element(document.createElement('location'));
        newElement.attr('locId', locNo);
        var el = $compile(newElement)(scope);
        element.parent().find('.locList').append(el);
        locNo++;
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
* Datepicker Directive
*
**/



.directive('datePicker', function($parse){
    var linker = function(element, attrs) {

    	var model = $parse(attrs.ngModel);

    	return function(scope, element, attrs, controller){
        $(element).find("input").pickadate({onSet: function(content){
        	processNewDate(this.get('select'));
        }});


        var processNewDate = function(newD){
        	scope.$apply(function(scope){
        		model.assign(scope,newD);
        	})
        }

        }
    };
    return {
        restrict: "E",
        compile: linker,
        template: "<input type=\"text\">"
    }
})


/**
*
* Timepicker Directive
*
**/


.directive('timePicker', function($parse){
    var linker = function(element, attrs) {

    	var model = $parse(attrs.ngModel);

    	return function(scope, element, attrs, controller){
        $(element).find("input").pickatime({ 
        	min: [7,30],
    		max: [22,0],
    		onSet: function(content){
        	processNewDate(this.get('select'));
        }});


        var processNewDate = function(newD){
        	scope.$apply(function(scope){
        		model.assign(scope,newD);
        	})
        }

        }
    };
    return {
        restrict: "E",
        compile: linker,
        template: "<input type=\"text\">"
    }
})


/**
*
* Staff Picker Directive
*
**/


.directive('addStaff',function(UserServices){
	var compiler = function(element, attrs){
		return function(scope, element, attrs, controller){
			var a = UserServices.getAllUsersJson();
			var elAppend = $(element).find('.staffList');

			var selectOptions = {
				tags:true,
				tokenSeparators: [","],
				data:a,
				width:'40%',
				createSearchChoice: function(term, data) {
				    if ($(data).filter(function() {
				      return this.text.localeCompare(term) === 0;
				    }).length === 0) {
				      return {
				        id: term,
				        text: term
				      };
				    }
				  },
				multiple: true,
			}

			$(element).find('input').select2(selectOptions);
		}
	};
	return{
		restrict: "E",
		compile: compiler,
		template: "<input type='hidden' id='category' /><div class='staffList'></div>"
	}

})



/**
*
* Blur Directive
*
**/


.directive('blurFocus',
  function(){
   return {
        restrict: 'A',
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
})

