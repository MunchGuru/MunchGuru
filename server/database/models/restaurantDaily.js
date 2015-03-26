var db = require('../config');
var Organization = require('./organization');

var RestaurantDaily = db.Model.extend({
  tableName: 'restaurantsDaily',
  hasTimestamps: true,

  organizations: function(){
    return this.belongsToMany(Organization);
  }

});


module.exports = RestaurantDaily;