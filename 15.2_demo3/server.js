let http = require("http");
let sio = require("socket.io");
let fs = require("fs");

let server = http.createServer( (req,res) => {
    res.writeHead(200, {
        "Content-Type": "text/html"
    })
    res.end(fs.readFileSync("./index.html"));
})

let socketIO = sio(server);
socketIO.on('connection', socket => {
    socket.emit('setName', '张三', (data1, data2) => {
        console.log(data1)
        console.log(data2)
    })
})
server.listen(1337)
