var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubtitleSchema = new Schema({
  title: String ,
  original_file_name: String ,
  owner: {type : Schema.ObjectId, ref : 'User'},
  is_delete: {type: Boolean, default: false },
  timestamp_created: {type: Date, default: Date.now },
  timestamp_last_updated: {type: Date, default: Date.now },
  rankings: [{
    title: {type: String},
    ranking: {type: Number}
  }],
  raw_content: {type: String}
});

SubtitleSchema.statics = {

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

mongoose.model('Subtitle', SubtitleSchema);

