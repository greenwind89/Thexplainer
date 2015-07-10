var passport = require('passport');
var mongoose = require('mongoose');
var FacebookStrategy = require('passport-facebook').Strategy;
require('./model/user');
var User = mongoose.model('User');


exports = module.exports = function(config) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new FacebookStrategy({
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL
    },

    function(accessToken, refreshToken, profile, done) {
      User.findOne({ 'facebook_id': profile.id }, function (err, user) {
        if (err) { return done(err) }
        if (!user) {
          user = new User({
            full_name: profile.displayName,
            facebook_id: profile.id,
            email: profile.emails  ? profile.emails[0].value : '',
            username: profile.username,
            provider: 'facebook',
            facebook: profile._json
          })
          user.save(function (err) {
            if (err) console.log(err)
            return done(err, user)
          })
        }
        else {
          return done(err, user)
        }
      })
    }
  ));

  return passport;
}

