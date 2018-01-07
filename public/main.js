'use strict'

const port = 8080
const socket = io.connect(document.location.origin)
const chat = () => document.querySelectorAll('.chat')[0]
const input = () => document.querySelectorAll('.input-area')[0]
const btn = () => document.querySelectorAll('.btn')[0]

let data = {
  showChat: false,
  showNameTut: true,
  formInput: 'name-input',
  chatStyle: { height: 0, opacity: 0 },
  connected: 0,
  chat: []
}

Vue.component('chat-line-status', {
  template: `
    <li class="chat-line" :class="'_' + line.status" >
      <span class="name">{{line.name}}: </span><span>{{line.msg}}</span>
    </li>
  `
});

const app = new Vue({
  el: '.app',
  data: data,
  computed: {
  },
  methods: {
  }
})

socket.on('newUser', function(name) {
  console.log('New user has been connected to chat | ' + name)
  // chat().innerHTML +=  '<li class="chat-line _status"><span class="name">' + name + '</span> <span>ebnulsa, i zashel suda</span></li>'
  data.chat.push({
    status: 'status',
    name: name,
    msg: 'ebanulsa i zashel'
  })
});

socket.on('greet', function(name, connected) {
  // console.log('New user has been connected to chat | ' + name)
  data.connected = connected
  // chat().innerHTML +=  '<li class="chat-line _status"><span>konichiwa nahui </span><span class="name">' + name + '</span></li>'
  data.chat.push({
    status: 'status',
    name: name,
    msg: 'konichiwa nahui'
  })
});

socket.on('message', function(name, msg) {
  console.log(name + ': ' + msg)
  // chat().innerHTML +=  '<li class="chat-line _message"><span class="name">' + name + ': </span><span>' + msg + '</span></li>'
  data.chat.push({
    status: 'message',
    name: name,
    msg: msg
  })
});

socket.on('userLeave', function(name, connected) {
  console.log(name + ' leavenul')
  data.connected = connected
  // chat().innerHTML +=  '<li class="chat-line _status"><span class="name">' + name + ': </span><span> stal svoboden</span></li>'
  data.chat.push({
    status: 'status',
    name: name,
    msg: 'ebanulsa i zashel'
  })
});


input().addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    btn().click();
  }
})

btn()
  .addEventListener("click", function btnClickEvent() {
  let name = input().innerText
  if ( name ) {
    socket.emit('newUser', name)
    console.log('new user name: '+ name)
    input().innerText = ''

    data.formInput = 'chat-input'
    data.showChat = true
    data.showNameTut = false
    setTimeout( () => chat().style = '', 50)
    data.chatStyle = false
    this.removeEventListener("click", btnClickEvent)

    btn().addEventListener("click", function() {
      let message = input().innerText
      if ( message ) {
        socket.emit('message', message)
        input().innerText = ''
      }
    })
  }
})





