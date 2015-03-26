var express = require('express');
var router = express.Router();
var request = require('superagent');
var authenticate = require('../../components/utils.js').authenticate;
var Organization = require('../../database/models/organization.js');
var User = require('../../database/models/user.js');

router.get('/getorgs/github', authenticate, function(req,res){
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

router.post('/setorg/github', authenticate, function(req,res){
  var orgId = parseInt(req.body.orgId);
  Organization.forge()
  .where({github_id: orgId})
  .fetch() // find the organization with that github ID
  .then(function(organization){
    if (!organization){
      res.send({create: true, github_id: orgId}); // if the organization isn't in our database, send the user to the creation flow
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

router.get('/token', authenticate, function(req,res){
  res.send({access_token: req.user.access_token});
});

module.exports = router;