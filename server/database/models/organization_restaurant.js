var db = require('../config');
var Rating = require('./rating');
var Organization = require('./organization');
var Restaurant = require('./restaurant');


var OrganizationRestaurant = db.Model.extend({
  tableName: 'organizations_restaurants',
  hasTimestamps: true,

  restaurant: function(){
    return this.belongsTo(Restaurant);
  },

  organizations: function(){
    return this.belongsTo(Organization);
  }
});


module.exports = OrganizationRestaurant;