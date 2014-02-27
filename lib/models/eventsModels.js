'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    

var EventSchema = new Schema({
  name:           String,
  description:    String,
  author:         String,
  eventUpdated:   {type: Date, default: Date.now },
  staffInvolved:  [{userId: String}],
  dates:          [],
  eventStage:     [{stageId: String}],
  currentStage:   {
                    stageId: String,
                    currentStage: Boolean
                  }
});

var LocationSchema = new Schema({
  name:           String,
  area:           String,
  building:       String,
  imgPath:        String,
  bookings:       [],
  capacity:       String
});


var StageScheme = new Schema({
  name:            String,
  type:            String,
  userGroups:      [],
  items:           [{itemId:String, order:Number}],
  stageOptions:    []
});


var CommentScheme = new Schema({
  author:          String,
  dateCreated:     {type:Date, default: Date.now},
  content:         String,
  status:          String,
  type:            String,
  relatedTo:       String
});



var EventItemScheme = new Schema({
  itemName:             String,
  content:              String,
  comments:             [{commentId:String}],
  type:                 String,
  status:               String,
  stageId:              String,
  eventId:              String,
  eventItemCollection:  String

});

mongoose.model('Event', EventSchema);
mongoose.model('Stage', StageScheme);
mongoose.model('Location', LocationSchema);
mongoose.model('Comment', CommentScheme);
mongoose.model('EventItem', EventItemScheme);


EventSchema.virtual('id').get(function() { return this._id; });
StageScheme.virtual('id').get(function() { return this._id; });
CommentScheme.virtual('id').get(function() { return this._id; });
EventItemScheme.virtual('id').get(function() { return this._id; });
