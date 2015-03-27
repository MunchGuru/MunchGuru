var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var http = require('http');

router.get('/:dailyloc?', function(req, res){
  console.log('hit dailyloc.js');
});

module.exports = router;