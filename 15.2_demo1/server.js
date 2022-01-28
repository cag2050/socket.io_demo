let http = require("http");
let sio = require("socket.io");
let fs = require("fs");

let server = http.createServer( (req,res) => {
    res.writeHead(200, {
        "Content-Type": "text/html"
    })
    res.end(fs.readFileSync("./index.html"));
})

let socket = sio(server);
socket.on('connection', socket => {
    console.log('客户端建立连接。')
    socket.send('你好。')
    socket.on('message', msg => {
        console.log('接收到一个消息：', msg)
    })
    socket.on('disconnect', () => {
        console.log('客户端断开连接。')
    })
})
server.listen(1337)
