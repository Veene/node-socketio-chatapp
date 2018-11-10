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
    socket.on('disconnect', () => {
        console.log('user was disconnected')
    })
})


server.listen(port, () => {
    console.log(`server on port ${port}`)
})