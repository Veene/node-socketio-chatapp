const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000
var app = express();
var server = http.createServer(app)
//pass server that we want to use with our websockets (how to communicate with server and client)
var io = socketIO(server)

//middleware for pathing
app.use(express.static(publicPath))

//register an event listener, listen for event and do something when it happens
io.on('connection', (socket) => {
    console.log('new user connected')

    socket.emit('newEmail', {
        from: 'mike@example.com',
        text: 'Hey. Whats going on?',
        createdAt: 123
    });
    socket.on('createEmail', (newEmail) => {
        console.log('createEmail: ', newEmail)
    })
    socket.on('createMessage', function(message) {
        console.log('createMessageFromClient: ', message)
        var clientMessage = `Hi everyone, ${message.from} wants to say: ${message.text}`
        socket.emit('newMessage', {
            clientMessage : clientMessage,
            createdAt: 123123
        })
    })

    socket.on('disconnect', () => {
        console.log('user was disconnected')
    })
})


server.listen(port, () => {
    console.log(`server on port ${port}`)
})