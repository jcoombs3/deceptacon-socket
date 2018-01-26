'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = 4200;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server, { origins: '*:*'});

io.on('connection', (socket) => {
  console.log('++ a client connected...');
  
  socket.on('com.deceptacon.event', function (arr) {
    console.log('++ com.deceptacon.event', arr.event);
    io.sockets.emit(arr.event, arr.data);
  });
  
  socket.on('disconnect', () => console.log('++ a client disconnected...'));
});
