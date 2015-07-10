var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RankingSchema = new Schema({
  title: String ,
  ranking: Number, //
});

RankingSchema.statics = {

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

mongoose.model('Ranking', RankingSchema);

