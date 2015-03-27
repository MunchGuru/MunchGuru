'use strict';
// var _ = require('lodash');
var Location = require('../../database/models/location');
var Locations = require('../../database/collections/locations');
var Vote = require('../../database/models/vote');

exports.loc = {
  postLoc: function(req, res) {

    var yelp_id = req.body.yelp_id;
    var name = req.body.name;
    var rating = req.body.rating;
    var imgUrl = req.body.photo_url;
    var gitOrg_id = req.body.github_id;

    new Location({yelp_id: yelp_id, organization_id: gitOrg_id}).fetch().then(function(found){
      if(found) {
        res.status(200).send('Location already posted');
      } else {
        new Location({yelp_id: yelp_id, organization_id: gitOrg_id, name: name, rating: rating, imgUrl: imgUrl}).save().then(function(model){
        res.status(200).send('Location successfully posted');
        console.log('Location successfully posted');
        });
      }
    });
},
  getLoc: function(req,res) {
    var gitOrg_id = req.query.github_id;

    var locArray=[];

    var locItem = function(yelp_id, name, users, rating){

    };

    new Location({organization_id: gitOrg_id}).fetchAll().then(function(collection){

    });



  }
};

