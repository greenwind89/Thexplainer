var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String ,
  email: String,
  first_name: String,
  last_name: String,
  provider: String, // Facebook, Google
  access_token: String,
  facebook_id: String,
  full_name: String,
  facebook: {}, // Additional information, maybe useful later
});

mongoose.model('User', UserSchema);
