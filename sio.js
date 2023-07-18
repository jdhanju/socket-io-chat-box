var express = require('express')
var http = require('http')
var app = express()
var server = http.createServer(app)

const { Server } = require("socket.io")
const io = new Server(server)

var clients = 0;

app.use(express.static("./public"))

io.on('connection', function(socket) {
    console.log('new connection')
    clients++;

    socket.emit('clientChange', clients) // emits only to the socket client
    socket.broadcast.emit('clientChange', clients) // emit to everyone except socket client
    socket.broadcast.emit('message', 'new user connected!!')
    socket.emit("message", "You're connected!")

    socket.on('chat', function(message) {
        io.emit('message', message)  // sends to everyone
    })

    socket.on('who', function(message) {
        io.emit('whoClicked', message);
    })

    socket.on('disconnect', function() {
        clients--
        socket.broadcast.emit('clientChange', clients)
    })

})

server.listen(3000, () => {
    console.log('listening 3000')
})