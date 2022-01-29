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
    socket.emit('news', {
        hello: '你好'
    })
    socket.on('myOtherEvent', (data) => {
        console.log('服务端接收到数据：', data)
    })
})
server.listen(1337)
