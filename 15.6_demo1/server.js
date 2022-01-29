let http = require("http");
let express = require("express")
let sio = require("socket.io");

let app = express()
let server = http.createServer(app)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

let socketIO = sio(server);
let chat = socketIO.of('/chat')
    .on('connection', socket => {
        socket.send('欢迎访问chat空间！')
        socket.on('message', msg => {
            console.log('chat命名空间接收到消息：' + msg)
        })
    })
let news = socketIO.of('/news')
    .on('connection', socket => {
        socket.emit('sendMessage', '欢迎访问new空间！')
        socket.on('sendMessage', data => {
            console.log('news命名空间接收到sendMessage事件，数据为：' + data)
        })
    })
server.listen(1337)
