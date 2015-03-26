var db = require('../config');
var Organization = require('./organization');
var User = require('./user');
var RestaurantDaily = require('./restaurantDaily');


var VoteDaily = db.Model.extend({
  tableName: 'organizations_restaurantsDaily',
  hasTimestamps: true,

  restaurantDaily: function(){
    return this.belongsTo(RestaurantDaily);
  },

  organizations: function(){
    return this.belongsTo(Organization);
  },

  users: function(){
    return this.belongsTo(User);
  }

});


module.exports = VoteDaily;