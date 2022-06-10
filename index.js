const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const fs  =require('fs')
var path = require("path");



app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');

});

app.get('/index.css',(req,res)=>{
    res.sendFile(path.join(__dirname + "/index.css"));
    // console.log("indexcssFile")
    // console.log(path.join(__dirname + "/index.css"))
});
app.get('/node_modules/bootstrap/dist/css/bootstrap.min.css',(req,res)=>{
    res.sendFile(path.join(__dirname + "/node_modules/bootstrap/dist/css/bootstrap.min.css"));
})
app.get('/script.js',(req,res)=>{
    res.sendFile(path.join(__dirname + "/script.js"));
})
app.get('/node_modules/bootstrap/dist/js/bootstrap.min.js',(req,res)=>{
    res.sendFile(path.join(__dirname + "/node_modules/bootstrap/dist/js/bootstrap.min.js"));
})

io.on('connection', (socket) => {
    // console.log('a user connected');
    let users = []
    socket.on('chat message',(msg) => {
        io.emit('chat message', msg);
        console.log(msg)
        
      });
    socket.on('send-nickname', function(nickname) {
        // socket.nickname = nickname;
        // users.push(socket.nickname);
        console.log(nickname)
        // console.log(users);
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
  });

server.listen(5050,()=>{
    console.log("listening on 5050")
})