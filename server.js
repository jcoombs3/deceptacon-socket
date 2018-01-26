const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const PORT = process.env.PORT || 3231

app.use(express.static("www"))

io.on('connection', function(socket) {  
    console.log('++ a client connected...');
  
    socket.on('com.deceptacon.event', function (arr) {
      console.log('++ com.deceptacon.event', arr.event);
      io.sockets.emit(arr.event, arr.data);
    });
});

app.listen(PORT, ()=>{
  console.log("Connected to port:" + PORT);
})
