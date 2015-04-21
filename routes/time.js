module.exports = function(app, utils){

  app.get('/time', function(req, res, next){

    var date = new Date();
    var hour = (date.getHours() >= 12)
      ? date.getHours() - 12
      : date.getHours();
    var minute = date.getMinutes();
    var time = hour + ':' + minute;
    var data = {
      'time' : time
    };

    utils.jsonResponse(req, res, 200, data);
    return next();

  });

};