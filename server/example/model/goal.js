var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GoalSchema = new Schema({
  title: String ,
  owner: {type : Schema.ObjectId, ref : 'User'},
  is_delete: {type: Boolean, default: false },
  color: String, // color code 
  priority: Number, // lower is higher priority 
  timestamp_created: {type: Date, default: Date.now },
  timestamp_last_updated: {type: Date, default: Date.now },
  order_number: {type: Number, default: 500000000}, // smaller is on to, 5 * 10^8
});

GoalSchema.statics = {

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

mongoose.model('Goal', GoalSchema);

