module.exports = function() {

  // environment
  var port = 8080;
  // config
  var package = require('./package.json');
  var utils = require('./controllers/utils');
  // core modules
  var fs = require('fs');
  var http = require('http');
  // express
  var express = require('express');
  var app = express();
  // middleware
  var bodyParser = require('body-parser');
  var errorhandler = require('errorhandler');
  var multer  = require('multer');
  // other modules
  var sticky = require('sticky-session');

  // configuration
  app.use(express.static(__dirname + '/public'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(multer({ dest: './public/images/uploads/'}));
  app.use(errorhandler());

  // used for websocket server
  var server = sticky(http.createServer(app));

  // routes
  fs.readdirSync('./routes').forEach(function(file) {
    require('./routes/' + file)(app, server, utils);
  });

  // listen
  server.listen(port, function () {
    console.log('%s listening at port %s', package.name, port);
  });

};