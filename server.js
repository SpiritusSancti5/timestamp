var express = require('express');
var path = require('path');
var app = express();

var moment = require('moment');

var port = process.env.PORT || 8080; 


// supposed to help with css file issue
app.use("/", express.static(__dirname + '/'));

// find index.html and render it
// app.get('/', function(req, res){
 //   res.sendFile(path.join(__dirname+'/index.html'));
    // using res.sendFile(path.join(__dirname+'/style.css')); here breaks the app and the page won't display properly
    // yes, i really wanted to try and see how that works out
//});

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