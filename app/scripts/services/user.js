'use strict';

angular.module('devApp.userServices', [])
  .service('UserServices', function UserServices($http, Restangular) {
    // AngularJS will instantiate a singleton by calling "new" on this function



    var user = {'userName':'Ro','imagePath':'/images/profile.jpg'};
    var users= [{'id':'0','text':'Ronan Brett','userName': 'Ro', 'imagePath':'/images/profile.jpg'},{'id':'0','text':'Ronan Brett','userName': 'Ro', 'imagePath':'/images/profile.jpg'},{'id':'0','text':'Ronan Brett','userName': 'Ro', 'imagePath':'/images/profile.jpg'},{'id':'0','text':'Ronan Brett','userName': 'Ro', 'imagePath':'/images/profile.jpg'},{'id':'0','text':'Ronan Brett','userName': 'Ro', 'imagePath':'/images/profile.jpg'},{'id':'0','text':'Ronan Brett','userName': 'Ro', 'imagePath':'/images/profile.jpg'},{'id':'0','text':'Ronan Brett','userName': 'Ro', 'imagePath':'/images/profile.jpg'},{'id':'0','text':'Ronan Brett','userName': 'Ro', 'imagePath':'/images/profile.jpg'},{'id':'0','text':'Ronan Brett','userName': 'Ro', 'imagePath':'/images/profile.jpg'},{'id':'0','text':'Ronan Brett','userName': 'Ro', 'imagePath':'/images/profile.jpg'},{'id':'0','text':'Ronan Brett','userName': 'Ro', 'imagePath':'/images/profile.jpg'},{'id':'0','text':'Ronan Brett','userName': 'Ro', 'imagePath':'/images/profile.jpg'},{'id':'0','text':'Ronan Brett','userName': 'Ro', 'imagePath':'/images/profile.jpg'},{'id':'0','text':'Ronan Brett','userName': 'Ro', 'imagePath':'/images/profile.jpg'},{'id':'0','text':'Ronan Brett','userName': 'Ro', 'imagePath':'/images/profile.jpg'},{'id':'0','text':'Ronan Brett','userName': 'Ro', 'imagePath':'/images/profile.jpg'},{'id':'0','text':'Ronan Brett','userName': 'Ro', 'imagePath':'/images/profile.jpg'},{'id':'0','text':'Ronan Brett','userName': 'Ro', 'imagePath':'/images/profile.jpg'},{'id':'0','text':'Ronan Brett','userName': 'Ro', 'imagePath':'/images/profile.jpg'},{'id':'0','text':'Ronan Brett','userName': 'Ro', 'imagePath':'/images/profile.jpg'},{'id':'0','text':'Ronan Brett','userName': 'Ro', 'imagePath':'/images/profile.jpg'},{'id':'0','text':'Ronan Brett','userName': 'Ro', 'imagePath':'/images/profile.jpg'},{'id':'0','text':'Ronan Brett','userName': 'Ro', 'imagePath':'/images/profile.jpg'},{'id':'0','text':'Ronan Brett','userName': 'Ro', 'imagePath':'/images/profile.jpg'},{'id':'0','text':'Ronan Brett','userName': 'Ro', 'imagePath':'/images/profile.jpg'},{'id':'0','text':'Ronan Brett','userName': 'Ro', 'imagePath':'/images/profile.jpg'},{'id':'0','text':'Ronan Brett','userName': 'Ro', 'imagePath':'/images/profile.jpg'},{'id':'0','text':'Ronan Brett','userName': 'Ro', 'imagePath':'/images/profile.jpg'}];

    return{
      getUserImage: function(){
        return user;
      },
      getAllUsersJson: function(){
      	return users;

      }
    };

  });
