module.exports = {

  jsonResponse : function(req, res, status, data){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.status(status).json({
      'status' : status, 
      'data' : data
    });
  }

};