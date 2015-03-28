'use strict';
// var _ = require('lodash');
var Location = require('../../database/models/location');
var Vote = require('../../database/models/vote');

exports.sendvote = {
  addVote: function(req, res) {

    var yelp_id = req.body.yelp_id;
    var org_id = req.body.org_id;
    var user_info = req.body.user_info; //not sure what this will be

    if(!yelp_id || !org_id || !user_info){
      res.send(404);
    }

    new Location({yelp_id: yelp_id, organization_id: org_id}).fetch().then(function(found){
      if(!found) {
        res.status(409).send("Error: location not identified for your organization");
        console.log('Location not identified for organization');
      } else {
        var locId = found.get('id');
        new Vote({user_info: user_info, organization_id: org_id}).fetch().then(function(found){
          if(found) {
            found.set('location_id', locId).save().then(function(model) {
              console.log('Vote successfully changed');
              res.send(200);
            });
          } else {
            new Vote({user_info: user_info, organization_id: org_id, location_id: locId}).save().then(function(model) {
              res.send(200);
              console.log('Vote successfuly submitted!');
            });
          }
        });
      }
    });
  }
};

