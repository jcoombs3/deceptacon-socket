let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
 
io.on('connection', (socket) => {
  console.log('++ a client connected...');
  
  socket.on('com.deceptacon.event', function (arr) {
    console.log('++ com.deceptacon.event', arr.event);
    socket.broadcast.emit(arr.event, arr.data);
  });
});
 
var port = process.env.PORT || 3001;
 
http.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});
