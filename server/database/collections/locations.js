var db = require('../config');
var Location = require('../models/location');

var Locations = new db.Collection();

Locations.model = Location;

module.exports = Locations;