var express = require('express');
const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(4200, () => console.log(`Listening on ${ 4200 }`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('++ a client connected...');
  
  socket.on('com.deceptacon.event', function (arr) {
    console.log('++ com.deceptacon.event', arr.event);
    io.sockets.emit(arr.event, arr.data);
  });
  
  socket.on('disconnect', () => console.log('++ a client disconnected'));
});