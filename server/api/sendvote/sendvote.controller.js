'use strict';
// var _ = require('lodash');
var Location = require('../../database/models/location');
var Vote = require('../../database/models/vote');

exports.sendvote = {
  addVote: function(req, res) {
    var voteObj = {};

    var yelp_id = req.body.yelp_id;
    var gitOrg_id = req.body.github_id;
    var user_id = req.body.user_id; //not sure what this will be

    new Location({yelp_id: yelp_id, organization_id: gitOrg_id}).fetch().then(function(found){
      if(!found) {
        res.status(409).send("Error: location not identified for your organization");
        console.log('Location not identified for organization');
      } else {
        var locId = found.get('id');
        new Vote({user_id: user_id, organization_id: gitOrg_id}).fetch().then(function(found){
          if(found) {
            found.set('location_id', locId).save().then(function(model) {
              console.log('Vote successfully changed');
            });
          } else {
            new Vote({user_id: user_id, organization_id: gitOrg_id, location_id: locId}).save().then(function(model) {
              res.status(200);
              console.log('Vote successfuly submitted!');
            });
          }
        });
      }
    });
  }
};

