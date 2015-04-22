module.exports = function() {

  // environment
  var port = 8080;
  // config
  var package = require('./package.json');
  // core modules
  var fs = require('fs');
  var http = require('http');
  // express
  var express = require('express');
  var app = express();
  // middleware
  var bodyParser = require('body-parser');
  var errorhandler = require('errorhandler');

  // configuration
  app.use(express.static(__dirname + '/public'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(errorhandler());

  // routes
  var utils = require('./controllers/utils');
  fs.readdirSync('./routes').forEach(function(file) {
    require('./routes/' + file)(app, utils);
  });

  // websocket server
  app = http.createServer(app);
  var websocketServer = require('./controllers/websockets');
  websocketServer.start(app, utils);

  // listen
  app.listen(port, function () {
    console.log('%s listening at port %s', package.name, port);
  });

};