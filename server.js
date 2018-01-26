//const express = require('express')
//const app = express()
//const server = require('http').Server(app)
//const io = require('socket.io')(server)
//
//const PORT = process.env.PORT || 3231
//
//app.use(express.static("www"))
//
//io.on('connection', function(socket) {  
//    console.log('++ a client connected...');
//  
//    socket.on('com.deceptacon.event', function (arr) {
//      console.log('++ com.deceptacon.event', arr.event);
//      io.sockets.emit(arr.event, arr.data);
//    });
//});
//
//app.listen(PORT, ()=>{
//  console.log(`listening on *:${PORT}`);
//})

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
 
io.on('connection', (socket) => {
  console.log('++ a client connected...');
  
  socket.on('com.deceptacon.event', function (arr) {
    console.log('++ com.deceptacon.event', arr.event);
    io.sockets.emit(arr.event, arr.data);
  });
  
  socket.on('disconnect', function(){
    io.emit('users-changed', {user: socket.nickname, event: 'left'});   
  });
 
  socket.on('set-nickname', (nickname) => {
    socket.nickname = nickname;
    io.emit('users-changed', {user: nickname, event: 'joined'});    
  });
  
  socket.on('add-message', (message) => {
    io.emit('message', {text: message.text, from: socket.nickname, created: new Date()});    
  });
});
 
var port = process.env.PORT || 3001;
 
http.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});
