'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Event = mongoose.model('Event'),
  Stage = mongoose.model('Stage'),
  Comment = mongoose.model('Comment'),
  EventItem = mongoose.model('EventItem');


/**
 * Populate database with sample application data
 */

//Clear old things, then add things in






// Clear old users, then add a default user
User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test',
    text: 'User Name'
  }, function() {
      console.log('finished populating users');
    }
  );
});
