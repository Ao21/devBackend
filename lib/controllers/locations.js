'use strict';

var mongoose = require('mongoose'),
    Event = mongoose.model('Location');




exports.getAllLocations = function(req, res) {
  return Location.find(function (err, locations) {
    if (!err) {
      return res.json(locations);
    } else {
      return res.send(err);
    }
  });
};



