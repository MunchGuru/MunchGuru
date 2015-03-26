var db = require('../config');
var User = require('./user');
var Restaurant = require('./restaurant');
var RestaurantDaily = require('./restaurantDaily');


var Organization = db.Model.extend({
  tableName: 'organizations',
  hasTimestamps: true,

  users: function(){
    return this.hasMany(User);
  },

  restaurants: function(){
    return this.belongsToMany(Restaurant, 'organizations_restaurants', 'organization_id', 'place_id');
  },

  restaurantsDaily: function(){
    return this.belongsToMany(RestaurantDaily, 'organizations_restaurantsDaily', 'organization_id', 'place_id');
  }
  
});


module.exports = Organization;