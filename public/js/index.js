//io is a method that initiates a request from client to server to open up a websocket and keep it open - make sure to save in variable 'socket'
var socket = io();
        
//first argument is event name, second is callback function
socket.on('connect', function() {
    console.log('connected to server')

    socket.emit('createMessage', {
        from: 'veene',
        text: 'hey everyone'
    })
})
socket.on('disconnect', function() {
    console.log('disconnected from server')
})
socket.on('newEmail', function(email) {
    console.log('new email', email);
})
socket.on('newMessage', function(msg) {
    console.log('client message: ', msg.clientMessage)
    console.log('createdAt: ', msg.createdAt)
})
