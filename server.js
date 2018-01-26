'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var io = require('socket.io')(server);

app.use(bodyParser.json());
app.set('port', process.env.PORT || 8080);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static("www")); 

//app.listen(app.get('port'), function () {
//  console.log("You're a wizard, Harry. I'm a what? Yes, a wizard, on port", app.get('port'));
//});

var server = require('http').createServer(app);
var io = require('socket.io')(server, {origins: '*:*'});

server.listen(app.get('port'), function(){
  console.log('listening on *:4200');
});

io.on('connection', function(socket) {  
  console.log('++ a client connected...');

  socket.on('com.deceptacon.event', function (arr) {
    console.log('++ com.deceptacon.event', arr.event);
    io.sockets.emit(arr.event, arr.data);
  });
});