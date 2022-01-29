let http = require("http");
let express = require("express")
let sio = require("socket.io");

let app = express()
let server = http.createServer(app)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

let socketIO = sio(server);
let names = []
socketIO.sockets.on('connection', socket => {
    socket.emit('login', names)
    socket.on('login', name => {
        names.push(name)
        // socketIO.sockets.emit('login', names)
        // 以上代码等效于以下2行代码
        socket.emit('login', names)
        socket.broadcast.emit('login', names)
    })
})
server.listen(1337)
