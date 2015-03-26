var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var http = require('http');	

var oauthSignature = require('oauth-signature');
var n = require('nonce')();
var request = require('request');
var qs = require('querystring');
var _ = require('lodash');



//yelp request function
//this is not set to request_yelp 
var request_yelp = function (set_parameters, callback) {
  'use strict';
  var httpMethod = 'GET';
  var url = 'http://api.yelp.com/v2/search';
  
  var default_parameters = {
    location: 'San+Francisco',
    sort: '0'
  };

  var required_parameters = {
    oauth_consumer_key : process.env.oauth_consumer_key,
    oauth_token : process.env.oauth_token,
    oauth_nonce : n(),
    oauth_timestamp : n().toString().substr(0,10),
    oauth_signature_method : 'HMAC-SHA1',
    oauth_version : '1.0'
  };

  var parameters = _.assign(default_parameters, set_parameters, required_parameters);
  var consumerSecret = process.env.consumerSecret;
  var tokenSecret = process.env.tokenSecret;
  var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false});

  parameters.oauth_signature = signature;
  var paramURL = qs.stringify(parameters);
  var apiURL = url+'?'+paramURL;

  request(apiURL, function(error, response, body){
    return callback(error, response, body);
  });

};

router.get('/:search?', function(req, res){
	request_yelp({term: req.params.search}, function(err, rep, body){
    res.json(200,JSON.parse(body));
	})
});

module.exports = router;
