var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MorphemeRankingSchema = new Schema({
  title: String ,
  ranking: Number, //
}, {
  collection: 'morphemeRankings'
});

MorphemeRankingSchema.statics = {

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

mongoose.model('MorphemeRanking', MorphemeRankingSchema);


