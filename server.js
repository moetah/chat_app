const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

// set post
const port = process.env.PORT || 8080

// deploy
server.listen(port)
app.use(express.static(__dirname + '/public'))



// emiters
io.on('connection', function (socket) {
  var name = 'U' + (socket.id).toString().substr(1,4)
  console.log('name: ' + name)
  socket.broadcast.emit('newUser', name)
  socket.emit('userName', name)

  socket.on('message', function(msg) {
    io.sockets.emit('messageToClients', msg, name)
  });
});