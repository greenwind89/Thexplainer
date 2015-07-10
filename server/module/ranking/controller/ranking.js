require('../model/ranking');
require('../model/morphemeRanking');
var mongoose = require('mongoose');
var Ranking = mongoose.model('Ranking');
var extend = require('util')._extend;
var rankingControllers = {
};

rankingControllers.createRanking = function(req, res, next) {
  var ranking = new Ranking(req.body);
  ranking.owner = req.user.id;
  ranking.save(function (err, ranking) {
    if (err){ 
      next(err);
    } else {
      res.send(JSON.stringify(ranking));
    }
  });

}

rankingControllers.getRankings = function(req, res, next) {
  Ranking.find({
    owner: req.user.id,
    is_delete: false
  }, function(err, rankings) {
    if(err) next(err); 
    res.send(JSON.stringify(rankings));
  });
}

rankingControllers.destroy = function(req, res, next) {
  var ranking = req.ranking;
  ranking.is_delete = true;
  ranking.save(function(err){
    if(err) next(err); 
    res.status(200).send();
  });

}

rankingControllers.load = function(req, res, next, id) {
  Ranking
    .findOne({ _id : id })
    .exec(function (err, ranking) {
      if (err) return next(err);
      if (!ranking) return next(new Error('Failed to load Ranking ' + id));
      req.ranking = ranking;
      next();
    })
}

rankingControllers.updateRanking = function(req, res, next) {
  var ranking = req.ranking;
  ranking = extend(ranking, req.body);
  ranking.save(function(err) {
    if(err) next(err); 
    res.status(200).send();
  });
}

exports = module.exports = rankingControllers;
