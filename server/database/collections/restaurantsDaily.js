var db = require('../config');
var RestaurantDaily = require('../models/restaurantDaily');

var RestaurantsDaily = new db.Collection();

RestaurantsDaily.model = RestaurantDaily;

module.exports = RestaurantsDaily;