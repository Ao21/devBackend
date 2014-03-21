'use strict';

var mongoose = require('mongoose'),
    Stage = mongoose.model('Stage'),
    Event = mongoose.model('Event');





/*==========  Add a Stage to an Event  ==========*/


exports.addStageToEvent = function(req,res){
  //req.body.id/stage

  var key = req.body.id; 
  var stage = req.body.stage; 
  
  Event.findOne({_id:key},function(err,doc){
    if(!err){
      doc.location.addToSet(stage);
      doc.save();
      return res.json(doc);
    }
    return res.json(err);
 
  }) 
}


/*==========  Get Stages  ==========*/


exports.getStages = function(req,res){
  Stage.find({}, function(err, docs){
    if(!err){
      console.log(docs);
      return res.json(docs);
    }
    return res.json(err);
  });

}

/*==========  Create a Stage  ==========*/


exports.createStage = function(req,res){
  //req.body.name/type/usergroup
  Stage.findOne({name:req.body.name},function(err,doc){
    if(!doc){
    
    var newStage = new Stage({ name: req.body.name, type: req.body.type, userGroups: [req.body.usergroup] });
    newStage.save(function(err2){
      if(!err2){

        return res.json(newStage);

      }
      return res.json(err);
      });
    }
  });
}


/*==========  Update a Stage Details (Cant change arrays)  ==========*/

exports.updateStage = function(req,res){
  Stage.update({_id: req.body.id}, {$set: req.body}, {upsert: false},
      function(err, numaffect){
        if(!err){
          return res.json(numaffect);
        }
        return res.json(err);
      });
    
}


/*==========  Update a Stage Usergroup Array  ==========*/


exports.updateStageUsergroups = function(req,res){
  console.log(req.params.eventstages);
  Stage.findOne({_id:req.body.id},function(err,doc){
    if(doc){
      for (var i = req.body.usergroups.length - 1; i >= 0; i--) {
        doc.userGroups.addToSet(req.body.usergroups[i]);
        doc.save(function(err2){
          if(!err2){
            return res.json(doc);
          }
          return res.json(err);
        });
      };
    }
  });
}

