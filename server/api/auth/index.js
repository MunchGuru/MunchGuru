var express = require('express');
var passport = require('../../config/passport.config.js');
var router = express.Router();
var request = require('superagent');
var authenticate = require('../../components/utils.js').authenticate;
var Organization = require('../../database/models/organization.js');
var User = require('../../database/models/user.js');

router.get('/github',
  passport.authenticate('github'),
  function(req, res){
    // The request will be redirected to Github for authentication, so this
    // function will not be called.
});

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    if (req.user.get('new')){
      req.user.set('new', false);
      res.redirect('/select_org');
    } else res.redirect('/');
});

router.post('/checkloggedin', function(req, res){
  res.send(req.isAuthenticated() ? req.user : false);
});

router.get('/logout', function(req, res){
  req.session.destroy(function(err){
    if (err) console.error('Error destroying session: ' + err);
    req.logout();
    res.redirect('/');
  });
});

router.get('/github/getorgs', authenticate, function(req,res){
  request.get('https://api.github.com/user/orgs')
  .query({access_token: req.user.access_token})
  .end(function(err,gitres){
    if (err){
      console.error('Error fetching Github organizations: ' + err);
      res.status(500).send();
    }
    res.send({orgs: gitres.body}); // this is the list of organizations from github
  });
});

router.post('/github/setorg', authenticate, function(req,res){
  var orgId = parseInt(req.body.orgId);
  Organization.forge()
  .where({github_id: orgId})
  .fetch() // find the organization with that github ID
  .then(function(organization){
    if (!organization){
      res.send({create: true}); // if the organization isn't in our database, send the user to the creation flow
    }
    else { // if the org exists, assign the org to the user
      User.forge()
      .where({id: req.user.id})
      .fetch()
      .then(function(user){
        user.set('organization_id', organization.get('id')) //set the user's organization id to the found org's ID
        .save()
        .then(function(){
          res.send({create: false}); // respond with instructions that no creation is necessary
        });
      });
    }
  });
})

module.exports = router;