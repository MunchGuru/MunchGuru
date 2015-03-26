var db = require('../config');
var Rating = require('./rating');
var Organization = require('./organization');
var RestaurantDaily = require('./restaurantDaily');


var OrganizationRestaurantDaily = db.Model.extend({
  tableName: 'organizations_restaurants',
  hasTimestamps: true,

  restaurantDaily: function(){
    return this.belongsTo(RestaurantDaily);
  },

  organizations: function(){
    return this.belongsTo(Organization);
  },

});


module.exports = OrganizationRestaurantDaily;