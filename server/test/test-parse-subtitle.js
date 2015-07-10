/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , should = require('should')
  , subtitleParser = require('../module/subtitle/service/parseSubtitle.js')
  , fs = require('fs')
  , context = describe;

var 
    cookies,
    count;

describe('Extract from subtitle', function () {

    it('Extract sentence Unix File' , function(done) {
        fs.readFile('./server/test/sample/sub1-linux-short.srt', 'utf8', function(err, data) {
          var result = subtitleParser.parse(data);
          result.length.should.equal(2);
          result[0].start_timestamp.should.equal(568);
          result[0].end_timestamp.should.equal(2415);
          result[0].content.should.equal('Okay where were we?');

          result[1].start_timestamp.should.equal(2415);
          result[1].end_timestamp.should.equal(4362);
          done();
        });

    });

})

