var db = require('../config');
var Organization = require('./organization');
var User = require('./user');
var Location = require('./location');


var Vote = db.Model.extend({
  tableName: 'votes',
  hasTimestamps: true,

  location: function(){
    return this.hasMany(Location);
  },

  organizations: function(){
    return this.hasMany(Organization);
  },

  users: function(){
    return this.belongsTo(User);
  }

});


module.exports = Vote;