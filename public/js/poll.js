(function(){

  var poller;
  var time = false;

  function getServerTime(callback){

    var self = this;

    $.getJSON('/time', function(data) {
      callback.call(self, data);
    });

  };

  function displayServerTime(){

    getServerTime(function(data){
      if(data.time !== time){
        $('#server-time-display').append('<p style="color:#0455db">Server time is now <strong>' + data.time + '</strong>.');
      }
      time = data.time;
    });

  };

  $('#btn-start-polling').on('click', function(e){

    e.preventDefault();
    $('#server-time-display').append('<p>Logging server time every minute...</p>');

    poller = setInterval(function(){
      displayServerTime();
    }, 1000);

  });

  $('#btn-stop-polling').on('click', function(e){

    e.preventDefault();
    $('#server-time-display').append('<p>...Stopped logging.</p>');
    clearInterval(poller);

  });
  
})();