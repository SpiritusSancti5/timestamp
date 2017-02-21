var express = require('express');
var path = require('path');
var app = express();

var moment = require('moment');

var port = process.env.PORT || 8080; 


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(port, function(){
    console.log('supposed to be ready on port 8080');
});


app.get('/:datestring', function(req,res) {
  var myDate;
  if(/^\d{8,}$/.test(req.params.datestring)) {
    myDate = moment(req.params.datestring, "X");
  } else {
    myDate = moment(req.params.datestring, "MMMM D, YYYY");
  }

  if(myDate.isValid()) {
    res.json({
      unix: myDate.format("X"),
      natural: myDate.format("MMMM D, YYYY")
    });
  } else {
    res.json({
      unix: null,
      natural: null
    });
  }
  
});