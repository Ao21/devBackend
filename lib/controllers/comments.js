'use strict';

var mongoose = require('mongoose'),
Stage        = mongoose.model('Stage'),
Event        = mongoose.model('Event'),
Comment      = mongoose.model('Comment');

exports.getComments = function(req,res){
	console.log(req);
	
	Comment.find({relatedTo:req.params.id}, function(err,comments){
		if(comments){
			console.log(comments)
			return res.json(comments);
		}
		if(!comments || err){
			return res.send(500, 'There was a problem creating the event Item');
		}
	})
	
}

exports.addCommentTo = function(req,res){
	console.log(req.body)
	//req.body.author/content/status/type/relatedTo

	// Comment Types depending on what its attached to
	// eventItem, event, stage

	var newComment = new Comment({
		author: req.body.author,
		content: req.body.content,
		status: req.body.status,
		type: req.body.type,
		relatedTo: req.body.relatedTo
	})

	newComment.save(function(err){
		if(!err){
			return res.json(newComment);
		}
		return res.send(500, 'There was a problem adding the Comment');
	})


}