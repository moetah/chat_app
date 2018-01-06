const port = 8080
const socket = io.connect(document.location.origin)
const chat = document.querySelectorAll('.chat')[0]
const input = document.querySelectorAll('.input-area')[0]
const btn = document.querySelectorAll('.btn')[0]

socket.on('userName', function(name) {
  console.log('You\'r username is => ' + name)
  chat.innerHTML +=  '<li class="chat-line _status"><span>konichiwa nahui </span><span class="name">' + name + '-kun</span></li>'
});

socket.on('newUser', function(name) {
  console.log('New user has been connected to chat | ' + name)
  chat.innerHTML +=  '<li class="chat-line _status"><span class="name">' + name + '</span> <span>ebnulsa, i zashel suda</span></li>'
});

socket.on('messageToClients', function(msg, name) {
  console.log(name + ' | => ' + msg)
  chat.innerHTML +=  '<li class="chat-line _message"><span class="name">' + name + ': </span><span>' + msg + '</span></li>'
});

input
  .addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    btn.click();
  }
});


btn.addEventListener("click", function() {
  let message = input.innerHTML
  if ( message ) {
  socket.emit('message', message)
  input.innerHTML = ''
  }
});




