module.exports = function(app) {
  var ranking = require('./route/ranking');
  app.use('/ranking', ranking);
}
