(function(){

  var time = false;
  var ws = false;

  // Get the server time and append data to the DOM.
  // Also, store the time, so we only display a new time.
  function displayServerTime(serverTime){

    if(serverTime !== time){
      $('#server-time-display').append('<p style="color:#0455db">Server time is now <strong>' + serverTime + '</strong>.');
    }
    time = serverTime;

  };

  /**
   *
   * DOM event binding
   *
   */

  // instantiate a WebSocket connection and bind to the message event
  $('#btn-start').on('click', function(e){

    e.preventDefault();
    $('#server-time-display').append('<p>Logging server time every minute...</p>');

    ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = function(e){
      displayServerTime(e.data);
    }

  });

  // close WebSocket connection by sending message to the server
  $('#btn-stop').on('click', function(e){

    e.preventDefault();
    $('#server-time-display').append('<p>...Stopped logging.</p>');

    if(ws) {
      ws.send('stopTimeSend');
      ws.close();
    }

  });

})();