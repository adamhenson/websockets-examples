var WebSocketServer = require('ws').Server;

module.exports = {

  'start' : function(app, utils){

    var wss = new WebSocketServer({ 'server' : app });

    wss.on('connection', function connection(ws) {
      ws.on('message', function incoming(message) {
        console.log('received: %s', message);
      });
      var tick = setInterval(function(){
        ws.send(utils.time());
      }, 1000);
    });

  }
  
};