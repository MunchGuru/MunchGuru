'use strict';
var express = require('express');
var controller = require('./sendvote.controller');

var router = express.Router();

router.post('/', controller.sendvote.addVote);

module.exports = router;