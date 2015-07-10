require('../model/sentence');
var mongoose = require('mongoose');
var Sentence = mongoose.model('Sentence');
var extend = require('util')._extend;
var sentenceControllers = {
};

sentenceControllers.createSentence = function(req, res, next) {
  var sentence = new Sentence(req.body);
  sentence.owner = req.user.id;
  sentence.save(function (err, sentence) {
    if (err){ 
      next(err);
    } else {
      res.send(JSON.stringify(sentence));
    }
  });

}

sentenceControllers.getSentences = function(req, res, next) {
  var query = {
    owner: req.user.id,
    is_delete: false
  };
    
  if(req.query.subId) {
    query.subtitle_id = req.query.subId;
  }

  Sentence.find(query).sort({start_timestamp: 1}).exec(function(err, sentences) {
    if(err) next(err); 
    res.send(JSON.stringify(sentences));
  });
}

sentenceControllers.destroy = function(req, res, next) {
  var sentence = req.sentence;
  sentence.is_delete = true;
  sentence.save(function(err){
    if(err) next(err); 
    res.status(200).send();
  });

}

sentenceControllers.load = function(req, res, next, id) {
  Sentence
    .findOne({ _id : id })
    .exec(function (err, sentence) {
      if (err) return next(err);
      if (!sentence) return next(new Error('Failed to load Sentence ' + id));
      req.sentence = sentence;
      next();
    })
}

sentenceControllers.updateSentence = function(req, res, next) {
  var sentence = req.sentence;
  sentence = extend(sentence, req.body);
  sentence.save(function(err) {
    if(err) next(err); 
    res.status(200).send();
  });
}

exports = module.exports = sentenceControllers;
