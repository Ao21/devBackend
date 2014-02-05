'use strict';

var mongoose = require('mongoose'),
    Event = mongoose.model('Event');

exports.addEvent = function(req, res){
  //req.body.name/author/type/staff
  console.log(req.body);
}

exports.getEvent = function(req, res) {
  return Event.find(function (err, things) {
    if (!err) {
      return res.json(things);
    } else {
      return res.send(err);
    }
  });
};



exports.getAllEvents = function(req, res) {
  return Event.find(function (err, things) {
    if (!err) {
      return res.json(things);
    } else {
      return res.send(err);
    }
  });
};



