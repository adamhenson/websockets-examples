(function(){

  var time = false;

  function displayServerTime(serverTime){

    if(serverTime !== time){
      $('#server-time-display').append('<p style="color:#0455db">Server time is now <strong>' + serverTime + '</strong>.');
    }
    time = serverTime;

  };

  $('#btn-start-polling').on('click', function(e){

    e.preventDefault();

    var ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = function(e){
      displayServerTime(e.data);
    }

  });

})();