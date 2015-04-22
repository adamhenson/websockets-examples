module.exports = {

  'jsonResponse' : function(req, res, status, data){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.status(status).json(data);
  },

  'time' : function(){
    var date = new Date();
    var hour = (date.getHours() >= 12)
      ? date.getHours() - 12
      : date.getHours();
    var minute = (date.getMinutes() >= 10)
      ? date.getMinutes()
      : '0' + date.getMinutes();
    var time = hour + ':' + minute;
    return time;
  }

};