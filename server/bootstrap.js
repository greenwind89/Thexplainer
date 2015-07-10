var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'local_development';
var config = require('./config/config')[env];
var fs = require('fs');
var bodyParser = require('body-parser');
var multer  = require('multer');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);


// I will keep all global states in app.domdom 
module.exports = function (app) {
  app.domdom = {};
  app.domdom.config = config;
  app.isProfilerOn = true;

  mongoose.connect(app.domdom.config.db);

  var MongoStoreOptions = {
    db: app.domdom.config.db
  };
  // Initialize session
  app.use(session({ 
    secret: 'keyboard cat',
    resave: false,
    store: new MongoStore(MongoStoreOptions),
    saveUninitialized: false
  }));

  // Add bobyparser middleware
  app.use( bodyParser.json() );       // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  })); 
  app.use(multer({ dest: './tmp/'}))
  
  // Load all main.js file in each module to bootstrap accordingly to each module
  var moduleDir = __dirname + '/module';
  require('./module/user/main')(app); // module user always needs to be loaded first
  fs.readdirSync(moduleDir).forEach(function (dir) {
    if(!~dir.indexOf('user')) require(moduleDir + '/' + dir + '/main.js')(app);
  })

}


