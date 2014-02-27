/*=============================================
=            New Event Controllers            =
=============================================*/



devApp.controller('NewEvController', 
  function($scope, EventTypeService){


  	$scope.onceOrSeriesToggle= true;

    $scope.locationList = [];
    $scope.locationDone = false;

    $scope.staffIncluded = [];
    $scope.staffDone = false;



    this.getLocLength = function(){
      //return $scope.locationList.length;
    }


    

    this.setEventType = function(e){
    	$scope.$parent.chosenEventType = e;
    }


 
    /* Add A Location Controller Directive Function - needs to use parent scope because the location controller has isolated scope, unlike the staff directive that inherits scope straight from this controller and doesn't can just change the scopes values inside of it (should definitely remember this) */
    
   
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
      if($scope.$parent.locationList.length>0){
          $scope.$parent.locationDone = true;
        }
        else{
          $scope.$parent.locationDone = false;
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
    templateUrl:function(tElement, tAttrs){ return 'partials/locationSelector.html'},
    compile:function(tElement, tattrs){

      return function(scope, element, attrs, controller){
        var lastDate = '';


        scope.isDisabled = false;
        scope.finished = false;


         scope.$watch('[startDate, startTime, area, endTime]', function (a) {
  	       if(a[0] && a[1] && a[2] && a[3]){
  	       	scope.isDisabled = true;
            element.addClass('valid');

            var startDate = moment(scope.startDate.obj);
            startDate.hour(scope.startTime.hour);
            startDate.minute(scope.startTime.mins)
            var endDate =  moment(scope.startDate.obj);
            endDate.hour(scope.endTime.hour);
            endDate.minute(scope.endTime.mins);

            var locObject = {
            locId:'loc'+attrs.locid,
            startDate:startDate,  
            endDate: endDate,     
            area:scope.area
            };

            element.addClass('submitted');
            LocationServices.checkIfBooked(startDate,scope.area.name)
            controller.addNewLocation(locObject);
  	       }
  	        }, true);

        
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
* SO DODGY. 
*
*
**/


.directive('addStaff',function($parse, UserServices){
	var compiler = function(element, attrs){
     var model = $parse(attrs.ngModel);

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
                type: 'selfAdded',
				        text: term
				      };
				    }
				  },
				multiple: true,
      };
			
      

			var sel = $(element).find('input').select2(selectOptions)
      .on('change',function(val){
        if(val.added){
          scope.$apply(function(scope){
              scope.staffIncluded.push(val.added);
            });
        };
        if(val.removed){
          var a = _.indexOf(scope.staffIncluded,{'id':val.removed.id});
          scope.$apply(function(scope){
            scope.staffIncluded.splice(a, 1);
          });
        };

      });
		
	}

};
	return{
		restrict: "E",
		compile: compiler,
    controller:'NewEvController',
		template: "<input ng-model='people' type='hidden' id='category' /><div class='staffList'></div>"
	}

})



/**
*
* Creates  Location Dropdown Select Button with Locations taken from the Locations Services
*
**/


.directive('locationDropdown',
  function($parse, $compile, LocationServices){

    var compiler = function(element, attrs){

      var model = $parse(attrs.ngModel);

    return function(scope, element, attrs, controller){
      var a = LocationServices.getLocations();
      var elAppend = $(element).find('.locationList');

      var selectOptions = {
        tokenSeparators: [","],
        data:a,
        width:'40%',
        multiple: false,

      }

      var processNewLocation = function(newLoc){
        scope.$apply(function(scope){
          model.assign(scope,newLoc);
        })
      }

      $(element).find('input').select2(selectOptions)
      .on('change',function(val){
          processNewLocation(val.added);
      });
    }
  };

   return{
    restrict: "E",
    compile: compiler,
    template:"<input ng-model='area' type='hidden' id='category' /><div class='locationList'></div>",
   
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

