module.exports = function(app) {
  var goal = require('./route/goal');
  app.use('/goal', goal);
}
