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
  
  app.post('/api/session', session.login);
  app.del('/api/session', session.logout);
  
  
  app.get('/event/:id', events.getEvent);
  app.get('/events', events.getAllEvents);
  app.post('/events', events.addEvent);
  
  app.get('/stage', stages.getStages);
  app.post('/stage', stages.createStage);
  app.post('/stage/link', stages.addStageToEvent);
  app.post('/stage/update', stages.updateStage);
  app.post('/stage/update/usergroups', stages.updateStageUsergroups);
  
  app.post('/comment', comments.addCommentTo )
  app.get('/comment/comments/:id', comments.getComments)
  
  
  app.post('/eventitem', eventitems.addEventItem)
  app.get('/eventitem', eventitems.getEventItems)
  
  
  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', middleware.setUserCookie, index.index);
};