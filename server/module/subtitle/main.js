module.exports = function(app) {
  var subtitle = require('./route/subtitle');
  app.use('/subtitle', subtitle);
}
