let http = require("http");
let express = require("express")
let sio = require("socket.io");

let app = express()
let server = http.createServer(app)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

let socketIO = sio(server);
socketIO.on('connection', socket => {
    socket.on('setNickname', (name) => {
        socket.nickname = name
        socket.emit('sendNickname', name)
    })
    socket.on('getNickname', () => {
        socket.emit('sendNickname', socket.nickname)
    })
})
server.listen(1337)
