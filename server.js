'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.set('port', 4200);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static("www"));

app.listen(app.get('port'), function () {
  console.log("You're a wizard, Harry. I'm a what? Yes, a wizard, on port", app.get('port'));
});









//
//
//const express = require('express');
//const socketIO = require('socket.io');
//const path = require('path');
//
//const PORT = 4200;
//const INDEX = path.join(__dirname, 'index.html');
//
//const server = express()
//  .use((req, res) => {
//    res.header("Access-Control-Allow-Origin", "*");
//    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//    res.sendFile(INDEX)
//  })
//  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
//
//const io = socketIO(server);
//
//io.on('connection', (socket) => {
//  console.log('++ a client connected...');
//  
//  socket.on('com.deceptacon.event', function (arr) {
//    console.log('++ com.deceptacon.event', arr.event);
//    io.sockets.emit(arr.event, arr.data);
//  });
//  
//  socket.on('disconnect', () => console.log('++ a client disconnected...'));
//});
