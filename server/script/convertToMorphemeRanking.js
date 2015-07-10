#!/usr/bin/env node 

// var program = require('commander'); 
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var natural = require('natural');

var convert = function(db, cb) {
  var startingTime = new Date();
  var rankings = db.collection('rankings');
  var morphemeRankings = db.collection('morphemeRankings');

  var cursor = rankings.find();
  var count = 0;
  cursor.each(function(err, ranking) {
    if(ranking === null) {
      console.log('done with getting ranking');
      // db.close();
      return;
    }

    var morpheme = natural.PorterStemmer.stem(ranking.title);

    (function(ranking, morpheme) {
      morphemeRankings.update({title: morpheme},  {$inc: {ranking: parseFloat(ranking.ranking)}}, {upsert: 1}, function(err, item) { // check if this morpheme already in db
        count++;
        console.log('processed: ', count);
        if(count % 10 === 0) {
          var now = new Date();
          var speed = count/(now.getTime() - startingTime.getTime()) * ( 60 * 1000 );
          console.log('remaining time is ' + Math.floor((3870123 - count) / speed ) + ' minutes');
        }

        if(count === 3870123) {
          console.log('DONE');
        }
      });
    })(ranking, morpheme);
    
  });

}


// Connection URL
var url = 'mongodb://localhost/thexplainer';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  convert(db, function() {
    db.close();
  });
});

