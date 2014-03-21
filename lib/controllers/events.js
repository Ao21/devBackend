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
  var tName, tDescription,uniqName,tEventType = "";
  var tLocations= []; var tStaff = []; var tEventDates =[];

  /* Get Event Details */

  tName = req.body.name;
  tDescription = req.body.description;
  tEventType = req.body.eventType;


  for (var i = req.body.locations.length - 1; i >= 0; i--) {
    var locId = req.body.locations[i].locId;
    var sD = req.body.locations[i].startDate;
    var eD = req.body.locations[i].endDate;
    var locName= req.body.locations[i].area.name;
    var lObj = {'locationId':locId, 'startDate': sD, 'endDate': eD, 'buildingName': locName};
    tLocations.push(lObj);
    tEventDates.push(req.body.locations[i].startDate);
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


  /**
  
    TODO:
    - uniqNames isn't seeing the docs so we can use it instead of ids
    - Second todo item
  
  **/
  
  

  uniqName = tName.toLowerCase();
  uniqName  = uniqName.replace(/\s+/g, "-") ;


  Event.find({name:tName},function(err,docs){
      if(docs){
        uniqName = uniqName + '-'+(docs.length+1);
      }
    });
  


var newEvent = new Event({
    name: tName,
    description: tDescription,
    staffInvolved:tStaff,
    dates:tEventDates,
    locations: tLocations,
    url: uniqName,
    eventType: tEventType
  });

  newEvent.save(function(err){
   if(!err){
      return res.json(newEvent);
    }
    return res.send(500, 'There was a problem creating the event Item');
  });


  





}

exports.getEvent = function(req, res) {
  console.log(req.params.id);

  return Event.findById(req.params.id,function (err, things) {
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


exports.addStagesToEvent = function(req, res) {
  var eventArray = JSON.stringify(req.params.eventstages);
  var json = JSON.parse(req.params.eventstages);


  

  return Event.findById(req.params.id,function (err, ev) {
    if (!err) {
      console.log(ev);
      ev.eventStages = json;

      ev.save(function(err){
        if(err){
          return res.send(err);
        }
        return res.json(ev);
      });

      
    } 
  });
};



