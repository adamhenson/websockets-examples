(function(){

  var ws = {
    host : 'ws://' + window.document.location.host.replace(/:.*/, '') + ':8080',
    connections : []
  };

  function createWebsocketConnection(onmessage){
    var length = ws.connections.length;
    ws.connections[length] = new WebSocket(ws.host);
    ws.connections[length].onclose = function(){
      createWebsocketConnection(onmessage);
    }
    // handle websocket events
    ws.connections[length].onmessage = function(event){
      onmessage.call(this, event);
    };
  };

  function submit($this, callback){

    var formData = new FormData($this[0]);

    $.ajax({
      url: $this.attr('action'),
      type: 'POST',
      data: formData,
      enctype: 'multipart/form-data',
      processData: false,
      contentType: false 
    }).done(function(data) {
      callback.call(this, data);
    }).error(function(xhr) {
      callback.call(this, xhr);
    });

  };

  function displayProgress(message){
    var progress = Math.ceil((message.progressAmount / message.progressTotal) * 100);
    $('.progress-bar').html(progress + '%');
    $('.progress-bar').css('width', progress + '%');
  };

  function displayResult(message){

    var result = '';
    var resultClass = '';

    if(message.type === 'error') {
      result = 'Error, ' + message.error;
      resultClass = 'danger';
    } else {
      result = 'Success, image uploaded!';
      resultClass = 'success';
      $('section').append('<img src="https://s3-us-west-2.amazonaws.com' + message.path + '" class="img-responsive" />');
    }
   
    $('body').prepend('<div class="alert alert-' + resultClass + '" role="alert">' + result + '</div>');
    $('.progress').hide();

  };

  $('form').on('submit', function(e){

    e.preventDefault();

    submit($(this), function(data){
      console.log(data);
    });

    $('.progress-bar').html('0%');
    $('.progress-bar').css('width', '0%');
    $('.progress').show();
    $('.alert').remove();
    $('img').remove();

    // manage websocket connections
    createWebsocketConnection(function(event){
      var message = JSON.parse(event.data);
      if(typeof message.type !== 'undefined') {
        if(message.type === 'progress') displayProgress(message);
        else if(message.type === 'result') displayResult(message);
        else if(message.type === 'error') displayResult(message);
      };
    });

  });

})();