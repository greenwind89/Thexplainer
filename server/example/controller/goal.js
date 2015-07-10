require('../model/goal');
var mongoose = require('mongoose');
var Goal = mongoose.model('Goal');
var extend = require('util')._extend;
var goalControllers = {
};

goalControllers.createGoal = function(req, res, next) {
  var goal = new Goal(req.body);
  goal.owner = req.user.id;
  goal.save(function (err, goal) {
    if (err){ 
      next(err);
    } else {
      res.send(JSON.stringify(goal));
    }
  });

}

goalControllers.getGoals = function(req, res, next) {
  Goal.find({
    owner: req.user.id,
    is_delete: false
  }, function(err, goals) {
    if(err) next(err); 
    res.send(JSON.stringify(goals));
  });
}

goalControllers.destroy = function(req, res, next) {
  var goal = req.goal;
  goal.is_delete = true;
  goal.save(function(err){
    if(err) next(err); 
    res.status(200).send();
  });

}

goalControllers.load = function(req, res, next, id) {
  Goal
    .findOne({ _id : id })
    .exec(function (err, goal) {
      if (err) return next(err);
      if (!goal) return next(new Error('Failed to load Goal ' + id));
      req.goal = goal;
      next();
    })
}

goalControllers.updateGoal = function(req, res, next) {
  var goal = req.goal;
  goal = extend(goal, req.body);
  goal.save(function(err) {
    if(err) next(err); 
    res.status(200).send();
  });
}

exports = module.exports = goalControllers;
