require('../model/itemSub');
var mongoose = require('mongoose');
var itemSub = mongoose.model('itemSub');
var extend = require('util')._extend;
var itemSubControllers = {
};

itemSubControllers.createitemSub = function(req, res, next) {
  var itemSub = new itemSub(req.body);
  itemSub.owner = req.user.id;
  itemSub.save(function (err, itemSub) {
    if (err){ 
      next(err);
    } else {
      res.send(JSON.stringify(itemSub));
    }
  });

}

itemSubControllers.getitemSubs = function(req, res, next) {
  itemSub.find({
    owner: req.user.id,
    is_delete: false
  }, function(err, itemSubs) {
    if(err) next(err); 
    res.send(JSON.stringify(itemSubs));
  });
}

itemSubControllers.destroy = function(req, res, next) {
  var itemSub = req.itemSub;
  itemSub.is_delete = true;
  itemSub.save(function(err){
    if(err) next(err); 
    res.status(200).send();
  });

}

itemSubControllers.load = function(req, res, next, id) {
  itemSub
    .findOne({ _id : id })
    .exec(function (err, itemSub) {
      if (err) return next(err);
      if (!itemSub) return next(new Error('Failed to load itemSub ' + id));
      req.itemSub = itemSub;
      next();
    })
}

itemSubControllers.updateitemSub = function(req, res, next) {
  var itemSub = req.itemSub;
  itemSub = extend(itemSub, req.body);
  itemSub.save(function(err) {
    if(err) next(err); 
    res.status(200).send();
  });
}

exports = module.exports = itemSubControllers;
