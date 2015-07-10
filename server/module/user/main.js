

module.exports = function(app) {
  var passport = require('./passport')(app.domdom.config);
  var auth = require('./route/auth')(passport);
  var user = require('./route/user');

  app.use(passport.initialize())
  app.use(passport.session())

  app.domdom.passport = passport;

  app.use('/auth', auth);
  app.use('/user', user);
}
