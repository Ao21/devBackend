'use strict';

var mongoose = require('mongoose'),
    Event = mongoose.model('Event');



/*=============================================

  Event Object - as seen in newEvent.js Controllers

  obj:{
    name: name,
    description: description,
    locations:
      [{
        locId: id,
        startDate: startdate,
        endDate: enddate,
        area:{
          name: name,
          imshrPath: imgpath
        }
      }],
    staff:{
      text: userName,
      id: userId
    }
  }


=============================================*/


exports.addEvent = function(req, res){
  //req.body.name/author/type/staff
  console.log(req);
  console.log(req.body);
  var tName, tDescription = "";
  var tLocations= []; var tStaff = [];

  /* Get Event Details */

  tName = req.body.name;
  tDescription = req.body.description;

  for (var i = req.body.locations.length - 1; i >= 0; i--) {
    var locId = req.body.locations[i].locId;
    var sD = req.body.locations[i].startDate;
    var eD = req.body.locations[i].endDate;
    var locName= req.body.locations[i].area.name;
    var lObj = {'locationId':locId, 'startDate': sD, 'endDate': eD, 'buildingName': locName};
    tLocations.push(lObj);
  };

  for (var i = req.body.staff.length - 1; i >= 0; i--) {
    var staffName = req.body.staff[i].text;
    var staffId = "";
    if(req.body.staff[i].type!= 'selfAdded'){
      staffId = req.body.staff[i].id;
    }
    var sOBj = {'name':staffName, 'staffId':staffId };
    tStaff.push(sOBj);
  };


  console.log('name'+tName);
  console.log('description'+tDescription);
  console.log('locations'+ tLocations)
  console.log('staff'+tStaff);

  var newEvent = new Event({
    name: tName,
    description: tDescription,
    staffInvolved:tStaff,
    locations: tLocations
  });

  newEvent.save(function(err){
   if(!err){
      return res.json(newEvent);
    }
    return res.send(500, 'There was a problem creating the event Item');
  });


  





}

exports.getEvent = function(req, res) {
  return Event.findById(req.params.id, function (err, event) {
    if (!err) {
      console.log(event);
      return res.json(event);
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



