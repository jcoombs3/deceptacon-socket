'use strict';

var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var app = express();

const PORT = process.env.PORT || 4200;

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies
app.use(cors({ origin: '*' }));
// Settings for CORS
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});

var server = app.listen(cross.NormalizePort(PORT));
var io = require('socket.io').listen(server, {
    log: false,
    agent: false,
    origins: '*:*',
    transports: ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']
});

io.on('connection', (socket) => {
  console.log('++ a client connected...');
  
  socket.on('com.deceptacon.event', function (arr) {
    console.log('++ com.deceptacon.event', arr.event);
    io.sockets.emit(arr.event, arr.data);
  });
  
  socket.on('disconnect', () => console.log('++ a client disconnected...'));
});
