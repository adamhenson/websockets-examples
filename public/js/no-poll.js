(function(){

  var time = false;
  var ws = false;

  function displayServerTime(serverTime){

    if(serverTime !== time){
      $('#server-time-display').append('<p style="color:#0455db">Server time is now <strong>' + serverTime + '</strong>.');
    }
    time = serverTime;

  };

  $('#btn-start-polling').on('click', function(e){

    e.preventDefault();
    $('#server-time-display').append('<p>Logging server time every minute...</p>');

    ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = function(e){
      displayServerTime(e.data);
    }

  });

  $('#btn-stop-polling').on('click', function(e){

    e.preventDefault();
    $('#server-time-display').append('<p>...Stopped logging.</p>');

    if(ws) {
      ws.send('stopTimeSend');
      ws.close();
    }

  });

})();