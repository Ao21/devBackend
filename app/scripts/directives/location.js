devApp.controller('locations',function($scope,$compile){
    

    var locLists = $scope.locationList = ['date','date2'];

    this.getLocLength = function(){
      return $scope.locationList.length;
    }


    this.addLocation = function(newLoc){
      console.log(newLoc);
    }

    $scope.insertItem = function(val){
     $scope.locationList.push(['aLocation','hello']);
    }

    this.addNewDate = function(val){
      console.log('yay '+val);
      $scope.locationList.push('date'+':'+val);
    }

    
})





/*


devApp.directive('addALocation',function($compile){
  return {

    restrict: "A",
    transclude:true,
    template: "<button ng-click='add()'>Add a Location</button>",
    scope:true,
    link: function($scope,element, attrs, locController){
      var locNo = 0;
      $scope.add = function(){

        var a = angular.element('<new-location ng-model="locations.location'+locNo+'"></new-location>');

        var el = $compile(a) ($scope);
        angular.element(element).append(a);
        $scope.locations = a;

        

        //$scope.insertHere = el;
        locNo++;
      }
    }

  }
})




.directive('newLocation',function($compile,LocationServices){
   return{
    restrict: "E",
    scope:{},
    require:{'^ngController'},
    
    template:'<datepicker ng-model="date"></datepicker><location-dropdown ng-model="area" id=""></location-dropdown><button ng-click="add()">Submit</button>',
    
    link: function(scope, element, attrs){
      console.log(scope.dates)
       var locNo= 0, previousLocationDates="";


       scope.add = function(){
        console.log(scope.location.dates);
        console.log(scope.area);
        var nl = {
          dates: scope.date,
          area: scope.area
        }
        scope.curLoc = scope.dates;
        //scope.locations = nl;
        
       }
      


     
    }
  }
})

*/
