// Calling bootstrap then starting server 
(function() {
var express = require('express'); 
var https = require('https');
var http = require('http');
var app = express();
var fs = require('fs');
var optionsStatic = {
    extensions: ['htm', 'html']
};
var debug = require('debug');

var httpsOptions = {
  key: fs.readFileSync(__dirname + '/config/secured/local-key.pem'),
  cert: fs.readFileSync(__dirname + '/config/secured/local-cert.pem')
}

require('./bootstrap')(app); 

app.get('/', function(req,res) {
    res.redirect('/public/');
});

app.use('/public', express.static(__dirname + '/public', optionsStatic));

app.use(function errorHandler(err, req, res, next) {
  console.log(err);
  res.status(500).send('Something broke');
});

debug('App started');


https.createServer(httpsOptions, app).listen(4000);

})();



