var passport = require('passport');
var User = require('../database/models/user.js');
var GithubStrategy = require('passport-github').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var request = require('superagent');


passport.serializeUser(function(user, done) {
    done(null, user.get('id'));
});

passport.deserializeUser(function(id, done) {
  User.forge()
  .where({id: id})
  .fetch()
  .then(function(user){
    done(null,user.toJSON());
  });
});


var findOrCreateUserOauth = function (accessToken, refreshToken, profile, done, strategy){
  User.forge()
  .where({auth_type: strategy, auth_id: profile.id})
  .fetch()
  .then(function(user){
    if (!user){ //if the user doesn't exist, create it
      if (strategy === 'github'){ // grab their github org
        request.get('https://api.github.com/user/orgs')
        .query({access_token: accessToken})
        .end(function(err,res){
          // console.log(res.body); // this is the list of organizations
          // console.log(profile);
          User.forge({
            email: profile.email,
            username: profile.username,
            password: profile.displayName,
            is_admin: 0,
            access_token: accessToken,
            refresh_token: refreshToken,
            auth_type: strategy,
            auth_id: profile.id
          })
          .save()
          .then(function(user){
            user.set('new', true);
            return done(null,user);
          })
        });
      }
    } else { //if the user already existed, just return it
      return done(null,user);
    }
  });
};

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.DOMAIN + "/auth/github/callback",
    scope: 'read:org,user:email'
  },
  function(accessToken, refreshToken, profile, done) {
    // console.log(profile);
    findOrCreateUserOauth (accessToken, refreshToken, profile, done, 'github');
  }
));

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.forge()
//     .where({auth_type: 'local', username: username})
//     .fetch()
//     .then(function(user){
//       if (!user){
//           return done(null, false);
//         } else if(user.get('password') !== password) {
//             return done(null,false);
//           } else return done(null, user);
//     });
//   }
// ));


module.exports = passport;