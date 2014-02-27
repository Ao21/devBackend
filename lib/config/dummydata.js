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


Event.find({}).remove(function() {
  Event.create({
    name : 'Infoday',
    description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, reprehenderit, laudantium, voluptatem non eum nesciunt temporibus atque enim id quo quod magni quaerat quasi. Odit, dolor, harum, recusandae magnam qui doloremque dicta rerum tenetur cum veniam assumenda quae culpa nam eligendi natus ex unde quis maxime repellat sequi accusantium voluptatum corporis. Assumenda, omnis officia maiores. Corporis, fuga, perspiciatis, ea, nostrum minus ipsam dolores deserunt nesciunt eaque explicabo iure earum alias quisquam totam rerum tempore doloribus nam inventore facere provident vel aliquid dolor voluptatem quod dolorum veniam reprehenderit iste amet dolorem voluptatum. Laudantium, quae, sint, consectetur quisquam ea non asperiores itaque doloribus aut maxime corporis quo labore reprehenderit assumenda voluptatum perspiciatis nemo. Alias, deleniti, exercitationem vitae rerum delectus optio at itaque nemo eaque dignissimos magni inventore aut illum quasi nisi nesciunt asperiores accusantium laboriosam saepe quod ab atque nulla modi reprehenderit adipisci velit ad. Autem, laudantium in dolor ducimus placeat itaque.',
    author: 'authorID',
    comments: [{
      commentId: 'This needs work', commentAttachedTo: 'name'
    }]

  },function(err){
    console.log('Made an event')
  }
  );
});




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
