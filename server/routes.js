/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  //app.use('/api/search', require('./api/search'));
  app.use('/api/restaurants', require('./api/restaurant'));
  app.use('/auth', require('./api/auth'));
  app.use('/user', require('./api/user'));
  app.use('/org', require('./api/organization'));
  app.use('/api/search', require('./api/yelp'));
  

  // new APIs
  // app.use('/api/sendvote', require('./api/sendvote')); 
  // app.use('/api/dailyloc', require('./api/dailyloc')); 
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
