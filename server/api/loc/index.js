var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var http = require('http');
var loc = require('../../database/models/location.js');
var controller = require('./loc.controller');

// router.get('/', function(req, res){
//     res.json([
//    { id: 'gary-danko-san-francisco', name: 'Gary Danko', users: ['arianf', 'devmeyster', 'rob'],         rating: 4.5, photo_url:"http://www.hothangups.com/p7lsm_img_1/thumbs/GaryDanko_tmb.jpg" },
//    { id: 'chipotle-san-francisco',   name: 'Chipotle',   users: ['knatsuki92', 'ThornWinters'],          rating: 3,   photo_url:"http://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Chipotle_Mexican_Grill_logo.svg/1024px-Chipotle_Mexican_Grill_logo.svg.png" },
//    { id: 'mc-donalds-san-francisco', name: 'McDonalds',  users: ['gistrict9', 'asadsheikh', 'bportnoy'], rating: 3.5, photo_url:"http://img1.wikia.nocookie.net/__cb20100717060808/logopedia/images/a/a9/Mcdonalds-90s-logo.svg" },
//    { id: 'carl-jr-san-francisco',    name: 'Carl Jr',    users: ['gistrict9', 'asadsheikh', 'bportnoy'], rating: 2.5, photo_url:"https://fastfoodmenuprice.com/wp-content/uploads/2014/11/carls.jpeg"},
//    { id: 'subway-san-francisco',     name: 'Subway',     users: ['gistrict9', 'asadsheikh', 'bportnoy'], rating: 3.5, photo_url:"http://fontmeme.com/images/Subway-Logo.jpg" }
//  	]);
// });
router.get('/:orgId?', controller.loc.getLoc);
// router.get('/:search?', function(req, res){
//   request_yelp({term: req.params.search}, function(err, rep, body){
//     res.json(200,JSON.parse(body));
//   })
// });

router.post('/', controller.loc.postLoc);

module.exports = router;