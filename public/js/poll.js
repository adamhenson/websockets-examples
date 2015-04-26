(function(){

  var poller;
  var time = false;

  // Make AJAX request, and retrieve the JSON
  // response, and call the callback function.
  // '/time' responds with the server time.
  function getServerTime(callback){

    var self = this;

    $.getJSON('/time', function(data) {
      callback.call(self, data);
    });

  };

  // Get the server time and append data to the DOM.
  // Also, store the time, so we only display a new time.
  function displayServerTime(){

    getServerTime(function(data){
      if(data.time !== time){
        $('#server-time-display').append('<p style="color:#0455db">Server time is now <strong>' + data.time + '</strong>.');
      }
      time = data.time;
    });

  };

  /**
   *
   * DOM event binding
   *
   */

  // start polling on button click
  $('#btn-start').on('click', function(e){

    e.preventDefault();
    $('#server-time-display').append('<p>Logging server time every minute...</p>');

    poller = setInterval(function(){
      displayServerTime();
    }, 1000);

  });

  // stop polling on button click
  $('#btn-stop').on('click', function(e){

    e.preventDefault();
    $('#server-time-display').append('<p>...Stopped logging.</p>');
    clearInterval(poller);

  });
  
})();