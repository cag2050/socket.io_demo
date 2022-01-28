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
    socket.emit('news', {
        hello: '你好'
    })
    socket.on('myOtherEvent', (data) => {
        console.log('服务端接收到数据：', data)
    })
})
server.listen(1337)
