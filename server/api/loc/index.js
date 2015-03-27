var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var http = require('http');
var loc = require('../../database/models/location.js');

router.get('/get', function(req, res){
    res.json({
	  results: [
	    {
	      id: 'chipotle-san-francisco',
	      name: 'Chipotle',
	      users: ['bob', 'sue', 'rob'],
	      rating: 4.3
	    },
	    {
	      id: 'mc-donalds-san-francisco',
	      name: 'Mc Donalds',
	      users: ['mike'],
	      rating: 2.3
	    }
	  ]
	});
  res.end();
});
router.get('/set', function(req, res){

});

module.exports = router;