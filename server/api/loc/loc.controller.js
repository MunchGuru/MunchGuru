'use strict';
// var _ = require('lodash');
var Location = require('../../database/models/location');
var Locations = require('../../database/collections/locations');
var Vote = require('../../database/models/vote');

exports.loc = {
  postLoc: function(req, res) {
    
    var yelp_id = req.body.restaurant.id;
    var name = req.body.restaurant.name;
    var rating = req.body.restaurant.rating;
    var img_url = req.body.restaurant.image_url;
    var org_id = req.body.restaurant.org_id;

    console.log(yelp_id);
    console.log(name);
    console.log(rating);
    console.log(img_url);
    console.log(org_id);

    new Location({yelp_id: yelp_id, organization_id: org_id}).fetch().then(function(found){
      if(found) {
        res.status(200).send('Location already posted');
      } else {
        new Location({yelp_id: yelp_id, organization_id: org_id, name: name, rating: rating, img_url: img_url}).save().then(function(model){
        res.status(200).send('Location successfully posted');
        console.log('Location successfully posted');
        console.log("model", model);
        });
      }
    });
},
  getLoc: function(req,res) {

    var org_id = req.params.orgId;
    console.log('orgId', org_id);

    var locArray=[];

    var LocItem = function(yelp_id, locName, users, rating){
      this.id = yelp_id;
      this.name = locName;
      this.users = users;
      this.rating = rating;
    };



    new Location().query('where', 'organization_id', '=', org_id).fetchAll().then(function(collection){

        var total = collection.length;
        var count = 0;
        collection.forEach(function(model){
          var locId = model.get('id');
          var locName = model.get('name');
          var rating = model.get('rating');

          console.log('MODEL:', locId, locName, rating);

          new Vote().query('where', 'location_id', '=', locId).fetchAll().then(function(user_coll){
            // console.log('user:', user_coll);
            var users = [];
            console.log('users: ', users);
            user_coll.forEach(function(model){
              users.push(model.get('user_info'));
              console.log(model.get('user_info'));
            });
            var newLocItem = new LocItem(locId, locName, users, rating);
            // console.log(newLocItem);
            locArray.push(newLocItem);
            count++
            if(count === total){
              res.status(200).json({result: locArray});
            }
          });
        });

      });
  }
};

