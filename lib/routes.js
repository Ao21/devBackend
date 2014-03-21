'use strict';

var api    = require('./controllers/api'),
index      = require('./controllers'),
users      = require('./controllers/users'),
events     = require('./controllers/events'),
stages     = require('./controllers/stages'),
eventitems = require('./controllers/eventitems'),
comments   = require('./controllers/comments'),
session    = require('./controllers/session');

var middleware = require('./middleware');

/**
 * Application routes
 */
 module.exports = function(app) {

  // Server API Routes
  
  app.post('/api/users', users.create);
  app.put('/api/users', users.changePassword);
  app.get('/api/users/me', users.me);
  app.get('/api/users/:id', users.show);
  app.get('/api/userlist', users.getAllUsers);

  
  app.post('/api/session', session.login);
  app.del('/api/session', session.logout);
  
  
  app.get('/api/event/:id', events.getEvent);
  app.get('/api/events', events.getAllEvents);
  app.post('/api/events', events.addEvent);
  app.post('/api/event/:id/addstages/:eventstages', events.addStagesToEvent);
  
  app.get('/api/stage', stages.getStages);
  app.post('/api/stage', stages.createStage);
  app.post('/api/stage/link', stages.addStageToEvent);
  app.post('/api/stage/update', stages.updateStage);
  app.post('/api/stage/update/usergroups', stages.updateStageUsergroups);
  
  app.post('/api/comment', comments.addCommentTo )
  app.get('/api/comment/comments/:id', comments.getComments)
  
  
  app.post('/api/eventitem', eventitems.addEventItem)
  app.get('/api/eventitem', eventitems.getEventItems)

  app.post('/api/session', session.login);
  app.del('/api/session', session.logout);


  
  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', middleware.setUserCookie, index.index);
};