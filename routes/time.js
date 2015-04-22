module.exports = function(app, utils){

  app.get('/time', function(req, res, next){

    var data = {
      'time' : utils.time()
    };

    utils.jsonResponse(req, res, 200, data);
    return next();

  });

};