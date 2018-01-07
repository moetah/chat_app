const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

// set post
const port = process.env.PORT || 8080

let connected = 0

// deploy
server.listen(port)
app.use(express.static(__dirname + '/public'))



// emiters
io.on('connection', function (socket) {
  let name
  connected++
  console.log('user connected: ' + connected)

  socket.on('newUser', function(userName) {
    name = userName
    console.log('new user:' + name)

    socket.broadcast.emit('newUser', name, connected)
    socket.emit('greet', name, connected)
  });

  socket.on('message', function(msg) {
    io.sockets.emit('message', name, msg)
    console.log(name + ': ' + msg)
  });

  socket.on('disconnect', function(){
    connected--
    console.log('user ' + ( name ? name : '' ) + 'disconnected: ' + connected)
    if (name) socket.broadcast.emit('userLeave', name, connected)
  });
});