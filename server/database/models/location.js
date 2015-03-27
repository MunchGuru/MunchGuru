var db = require('../config');
var Organization = require('./organization');

var Location = db.Model.extend({
  tableName: 'locations',
  hasTimestamps: true,

  organizations: function(){
    return this.hasMany(Organization);
  }

});


module.exports = Location;