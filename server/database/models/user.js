var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var Organization = require('./organization');
var Rating = require('./rating');
var VoteDaily = require('./voteDaily')


var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  organization: function(){
    return this.belongsTo(Organization);
  },

  voteDaily: function(){
    return this.belongsTo(VoteDaily);
  },

  ratings: function(){
    return this.hasMany(Rating);
  },

  initialize: function(){
    this.on('creating', function(){
      if (this.get('password') !== null) this.hashPassword; //only hash the password if we're using that for auth
    });
  },

  comparePassword: function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      callback(isMatch);
    });
  },

  hashPassword: function(){
    var cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.get('password'), null, null)
      .bind(this)
      .then(function(hash) {
        this.set('password', hash);
      });
  }

});

module.exports = User;