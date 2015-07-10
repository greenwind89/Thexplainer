var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SentenceSchema = new Schema({
  title: String ,
  owner: {type : Schema.ObjectId, ref : 'User'},
  subtitle_id: {type : Schema.ObjectId, ref : 'Subtitle'},
  is_delete: {type: Boolean, default: false },
  timestamp_created: {type: Date, default: Date.now },
  timestamp_last_updated: {type: Date, default: Date.now },
  words: [{
    original: {type: String},
    rank_by_rare_in_sub: {type: Number},
    ranking_score: {type: Number},
    stemmed_word: {type: String}
  }],
  start_timestamp: {type: Number, default: null}, // in milli second from beginning of the movie
  end_timestamp: {type: Number, default: null},
});

SentenceSchema.statics = {

  /**
   * Find list by id
   *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
   */

  load: function (id, cb) {
    this.findOne({ _id : id })
      // .populate('user', 'name email username')
      // .populate('comments.user')
      .exec(cb)
  },
}

mongoose.model('Sentence', SentenceSchema);

