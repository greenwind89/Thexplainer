require('../model/item');
var mongoose = require('mongoose');
var Item = mongoose.model('Item');
var extend = require('util')._extend;
var itemControllers = {
};

itemControllers.createItem = function(req, res, next) {
  var item = new Item(req.body);
  item.owner = req.user.id;
  item.save(function (err, item) {
    if (err){ 
      next(err);
    } else {
      res.send(JSON.stringify(item));
    }
  });

}

itemControllers.getItems = function(req, res, next) {
  Item.find({
    owner: req.user.id,
    is_delete: false
  }, function(err, items) {
    if(err) next(err); 
    res.send(JSON.stringify(items));
  });
}

itemControllers.destroy = function(req, res, next) {
  var item = req.item;
  item.is_delete = true;
  item.save(function(err){
    if(err) next(err); 
    res.status(200).send();
  });

}

itemControllers.load = function(req, res, next, id) {
  Item
    .findOne({ _id : id })
    .exec(function (err, item) {
      if (err) return next(err);
      if (!item) return next(new Error('Failed to load Item ' + id));
      req.item = item;
      next();
    })
}

itemControllers.updateItem = function(req, res, next) {
  var item = req.item;
  item = extend(item, req.body);
  item.save(function(err) {
    if(err) next(err); 
    res.status(200).send();
  });
}

exports = module.exports = itemControllers;
