var WebSocketServer = require('ws').Server;

function Websocket(server, utils, config){
  this.server = server;
  this.utils = utils;
  this.wss = false;
  this.ws = false;
  this.tick = false;
  this.timeSend = config.timeSend;
};

Websocket.prototype = {

  start : function(){

    var self = this;

    self.wss = new WebSocketServer({ 'server' : self.server, 'port' : 3004 });

    self.wss.on('connection', function connection(ws) {
      console.log('websocket connected');
      self.ws = ws;
      self.communicate(ws);
      if(self.timeSend) self.startTimeSend()
    });

  },

  communicate : function(ws){

    var self = this;

    ws.on('message', function incoming(message) {
      console.log('websocket message received: %s', message);
      if(message === 'stopTimeSend') {
        clearInterval(self.tick);
        self.tick = false;
      }
    });

    ws.on('close', function close() {
      console.log('websocket disconnected');
      clearInterval(self.tick);
      self.tick = false;
    });

  },

  startTimeSend : function(){

    var self = this;

    self.tick = setInterval(function(){
      if(self.ws) self.ws.send(self.utils.time());
    }, 1000);

  }
  
};

module.exports = Websocket;