var Uploader = require('s3-image-uploader');

module.exports = function(app, server, utils){

  var uploader = new Uploader({
    'aws' : {
      'key' : process.env.NODE_AWS_KEY,
      'secret' : process.env.NODE_AWS_SECRET
    },
    'server' : server,
    'port' : 3004
  });

  app.post('/upload', function(req, res, next){
 
    res.connection.setTimeout(0); // this could take a while 
    var dateString = new Date().getTime();
    var file = req.files.upload;

    uploader.upload({

      fileId : dateString,
      bucket : process.env.NODE_AWS_BUCKET,
      source : file.path,
      name : file.name

    }, function(data){ // success

      console.log('upload success:', data);
      utils.jsonResponse(req, res, 200, { 'message' : 'success!' });
      return next();

    }, function(errMsg){ //error

      console.error('unable to upload: ', errMsg);
      utils.jsonResponse(req, res, 200, { 'message' : 'error!' });
      return next();

    });
   
  });

};