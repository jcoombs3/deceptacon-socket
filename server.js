'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.set('port', process.env.PORT || 8080);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static("www")); 

app.listen(app.get('port'), function () {
  console.log("You're a wizard, Harry. I'm a what? Yes, a wizard, on port", app.get('port'));
});
