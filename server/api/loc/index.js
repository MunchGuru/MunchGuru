var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var loc = require('../../database/models/location.js');
var controller = require('./loc.controller');

router.get('/:orgId?', controller.loc.getLoc);
router.post('/', controller.loc.postLoc);

module.exports = router;