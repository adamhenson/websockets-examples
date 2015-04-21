module.exports = function(app, utils){

  app.get('/', function(req, res, next){

    var data = {
      'content' : 'hi'
    };
    utils.jsonResponse(req, res, 200, data);
    return next();

  });

};