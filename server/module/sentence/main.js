module.exports = function(app) {
  var sentence = require('./route/sentence');
  app.use('/sentence', sentence);
}
