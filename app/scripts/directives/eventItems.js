
devApp.directive('compileDirective',function(){
    return{
        restrict:'EA',
        transclude: true,
        scope:{
            type:'=type'
        },
        template:'<div></div>'
    }
})

devApp.directive('sideComments', function($timeout, Comments) {
    return {
        restrict: 'EA',
        transclude: true,
        scope: { 
            sideComments: '=sideComments',
            itemId:"=itemId"                         
        },
        controller: function($scope, $element, $attrs) {
            var self = this;    
            this.addComment = function(){

            };

        },
        template: '<div class="sideComments"><div class="comment"></div></div>'
    }
})
.directive('addAComment',function(Comments){
    return{
        restrict: 'EA',
        transclude:true,
        require:'^sideComments',
        template: ''
    }
})
.directive('comment',function(Comments){
    return{
    restrict: 'EA',
    transclude:true,
    require:'^sideComments',
    template: ''
}
})



