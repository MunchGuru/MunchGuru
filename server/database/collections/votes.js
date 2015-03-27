var db = require('../config');
var Vote = require('../models/vote');

var Votes = new db.Collection();

Votes.model = Vote;

module.exports = Votes;