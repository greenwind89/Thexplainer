require('../model/subtitle');
var mongoose = require('mongoose');
var Subtitle = mongoose.model('Subtitle');
var Ranking= mongoose.model('Ranking');
var MorphemeRanking = mongoose.model('MorphemeRanking');
var Sentence = mongoose.model('Sentence');

var extend = require('util')._extend;
var subtitleControllers = { };
var fs = require('fs')
var path = require('path');
var appDir = path.dirname(require.main.filename);
var natural = require('natural');
var tokenizer = new natural.WordTokenizer();
var subParser = require('../service/parseSubtitle');

function uniqNoNum(a) {
  var seen = {};
  return a.filter(function(item) {
    return (!isNaN(item) || seen.hasOwnProperty(item)) ? false : (seen[item] = true);
  });
}

function processSubtitle(subContent, cb) {
  var words = uniqNoNum(tokenizer.tokenize(subContent));
  var rankings = [];
  var count = words.length - 1;
  for(var i = 0, len = words.length; i < len; i++) {
    var word = words[i];
    (function(word) {
      MorphemeRanking.findOne({'title': natural.PorterStemmer.stem(word.toLowerCase())}, (function(err, rank) {
        if(rank) {
          rankings.push(rank);
        }
        count--;
        if(count === 0) {
          rankings.sort(function(a, b) {
            return a.ranking - b.ranking;
          });

          cb(rankings, function(sub) {
            var rankDict = {};
            for(var j = 0, len2 = rankings.length; j < len2; j++) {
              var rank = rankings[j];
              rankDict[rank.title] = {rankByRareInSub: j, rankingScore: rank.ranking};
            }

            var sentences = subParser.parse(subContent);
            for(var j = 0, len2 = sentences.length; j < len2; j++) {
              var sentence = sentences[j];
              var words = tokenizer.tokenize(sentence.content);
              var wordsAndRanks = []
              for(var k = 0, len3 = words.length; k < len3; k++) {
                var word = words[k];
                var stemmedWord = natural.PorterStemmer.stem(word.toLowerCase());
                if(rankDict[stemmedWord]) {
                  wordsAndRanks.push({
                    original: word,
                    stemmed_word: stemmedWord,
                    rank_by_rare_in_sub: rankDict[stemmedWord].rankByRareInSub,
                    ranking_score: rankDict[stemmedWord].rankingScore
                  });
                }
              }

              var newSentence = new Sentence({
                title: sentence.content, 
                owner: sub.owner,
                words: wordsAndRanks,
                start_timestamp: sentence.start_timestamp,
                end_timestamp: sentence.end_timestamp,
                subtitle_id: sub._id
              });

              newSentence.save(function (err, subtitle) {
              });

            }
          });
        }
      }));
    })(word);

  }
}




subtitleControllers.createSubtitle = function(req, res, next) {
  // var subtitle = new Subtitle(req.body);
  if(req.files.file) {
    var file = req.files.file;
    var readableStream = fs.createReadStream(appDir + '/' + file.path);
    var data = '';
     
    readableStream.on('data', function(chunk) {
        data += chunk;
    });
     
    readableStream.on('end', function() {
      processSubtitle(data, function(rankings, cb) {
        var newSubtitle = {
          title: file.originalname,
          owner: req.user.id,
          raw_content: data, 
          rankings: rankings
        };

        var subtitle = new Subtitle(newSubtitle);

        subtitle.save(function (err, subtitle) {
          if (err){ 
            next(err);
          } else {
            cb(subtitle); // generate sentences of this sub
            res.send(JSON.stringify(subtitle));
          }
        });
      });;
    });

  }
}

subtitleControllers.getSubtitles = function(req, res, next) {
  Subtitle.find({
    owner: req.user.id,
    is_delete: false
  }, 'title', function(err, subtitles) {
    if(err) next(err); 
    res.send(JSON.stringify(subtitles));
  });
}

subtitleControllers.destroy = function(req, res, next) {
  var subtitle = req.subtitle;
  subtitle.is_delete = true;
  subtitle.save(function(err){
    if(err) next(err); 
    res.status(200).send();
  });

}

subtitleControllers.load = function(req, res, next, id) {
  Subtitle
    .findOne({ _id : id }, 'title')
    .exec(function (err, subtitle) {
      if (err) return next(err);
      if (!subtitle) return next(new Error('Failed to load Subtitle ' + id));
      req.subtitle = subtitle;
      next();
    })
}

subtitleControllers.updateSubtitle = function(req, res, next) {
  var subtitle = req.subtitle;
  subtitle = extend(subtitle, req.body);
  subtitle.save(function(err) {
    if(err) next(err); 
    res.status(200).send();
  });
}

exports = module.exports = subtitleControllers;
