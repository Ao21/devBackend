'use strict';

angular.module('devApp.commentService', [])
  .factory('Comments',function Stages(Restangular){

    var comments = Restangular.all('api/comment');
          
    return{

    	getComments: function(id){
    		
    		return  comments.one('comments',id).getList();
	      },
    	addCommentTo: function(comment, item){
       
        comments.post(comment).then(function(obj) {
            console.log(obj);
          }, function() {
            console.log("There was an error saving");
          });
    	}
     
    }
  });


