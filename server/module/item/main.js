module.exports = function(app) {
  var item = require('./route/item');
  app.use('/item', item);
}
