var WebSocketServer = require('ws').Server;

// WebSocket Constructor
function Websocket(server, utils, config){
  this.server = server;
  this.utils = utils;
  this.wss = false;
  this.ws = false;
  this.tick = false;
  this.timeSend = config.timeSend;
};

Websocket.prototype = {

  // Instantiate the WebSocket server.
  start : function(){

    var self = this;

    self.wss = new WebSocketServer({ 'server' : self.server });

    self.wss.on('connection', function connection(ws) {
      console.log('websocket connected');
      self.ws = ws;
      // start communication - message send / receive
      self.communicate(ws);
      if(self.timeSend) self.startTimeSend()
    });

  },

  // Communicate with the client - send / receive messages.
  communicate : function(ws){

    var self = this;

    // on message event (received message from client)
    // log the message, and if the client tells us to stop
    // the timer - we clear the interval.
    ws.on('message', function incoming(message) {
      console.log('websocket message received: %s', message);
      if(message === 'stopTimeSend') {
        clearInterval(self.tick);
        self.tick = false;
      }
    });

    // on close event (WebSocket connection closed) - log it
    ws.on('close', function close() {
      console.log('websocket disconnected');
      clearInterval(self.tick);
      self.tick = false;
    });

  },

  // Start a one second interval function to send the client
  // the server time.
  startTimeSend : function(){

    var self = this;

    self.tick = setInterval(function(){
      if(self.ws) self.ws.send(self.utils.time());
    }, 1000);

  }
  
};

module.exports = Websocket;