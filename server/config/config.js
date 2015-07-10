
var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

module.exports = {
  local_development: {
    db: 'mongodb://localhost/thexplainer',
    root: rootPath,
    home: 'http://localhost:4000/public/app/',
    app: {
      name: 'Yoda Development'
    },
    facebook: {
      clientID: "1421293168110643",
      clientSecret: "c490b8026badc9648061054146303525",
      callbackURL: "https://localhost:4000/auth/facebook/callback"
    },
  },
}


