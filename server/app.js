const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
// const io = new Server(server);
const io = new Server(server, { cors: { origin: "*" } });

app.get('/ping', (req, res) => {
  res.send('pong')
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat', (chat) => {
    console.log(chat)
    io.emit('chat', chat)
  })
});

server.listen(4000, () => {
  console.log('listening on *:4000');
});