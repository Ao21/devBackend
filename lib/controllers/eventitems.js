'use strict';

var mongoose = require('mongoose'),
	Stage = mongoose.model('Stage'),
    Event = mongoose.model('Event'),
    EventItem = mongoose.model('EventItem'),
    Comment = mongoose.model('Comment');


exports.addEventItem = function(req,res){
	console.log(req.body)
	var newEventItem = new EventItem(
		{	itemName: req.body.eventItem.name,
			content: req.body.eventItem.content,
			type: req.body.eventItem.type,
			stageId: req.body.stageId,
			eventId: req.body.eventId
		});
	newEventItem.save(function(err){
		if(!err){
			return res.json(newEventItem);
		}
		return res.send(500, 'There was a problem creating the event Item');
	})
}

exports.getEventItems = function(req,res){
	EventItem.find({}, function(err, docs){
    if(!err){
      console.log(docs);
      return res.json(docs);
    }
    return res.json(err);
  });
}

