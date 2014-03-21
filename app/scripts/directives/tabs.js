

/**
*
* <div tabs tabsdata='data'>
      <div tabsnav >
        {{ $index + 1}}
      </div>
            <div tabscontent>
              <p>
                {{ tab.desc }}
              </p>
            </div>
      
    </div>
*
**/


devApp.directive('tabs', function($timeout) {
        return {
            restrict: 'A',
            transclude: true,
            scope: { 
                tabsdata: '=tabsdata'                            
            },
            controller: function($scope, $element, $attrs) {
                var self = this;                
                $scope.current = 0;

                this.select = function(index) {
                    $timeout(function() {
                        angular.forEach($scope.tabsdata, function(tab) {
                            tab.selected = false;
                        });
                        $scope.tabsdata[index].selected = true;

                        $scope.current = index;
                    })
                };
                this.getTabs = function() { return $scope.tabsdata }

                $scope.$watch('tabsdata', function(value) {
                    if ($scope.tabsdata) {
                        ($scope.tabsdata[0].selected = true);

                    }
                });


            },
            template: '<div class="tabbed" ng-transclude></div>'
        }
    }).

    directive('tabsnav', function() {
        return {
            restrict: 'A',
            require: '^tabs',
            transclude: true,
            link: function($scope, $element, $attrs, tabsCtrl) {
                $scope.tabs = tabsCtrl.getTabs;
                $scope.select = tabsCtrl.select;
            },
            template: 
                '<div class="progressbar one-whole float--left">'+
                    '<div ng-repeat="tabNav in tabs()" ng-click="select($index)" ng-transclude ng-class="{ active: tabNav.selected }" class="cell"></div>'+
                '</div>'   
        }
    }).

    directive('tabscontent', function() {
        return {
            restrict: 'A',
            require: '^tabs',
            transclude: true,
            link: function($scope, $element, $attrs, tabsCtrl) {                
                $scope.tabs = tabsCtrl.getTabs;
                $scope.select = tabsCtrl.select;
            },            
            templateUrl:function(tElement, tAttrs){ return 'partials/dashboard/tabs.html'},
        }
    })    
