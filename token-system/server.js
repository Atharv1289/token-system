const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

let currentToken = 'T-000';

io.on('connection', (socket) => {
  console.log('a user connected');

   socket.emit('currentToken', currentToken); 

   socket.on('setCurrentToken', (nextToken) => {
    console.log('Received current token:', nextToken);
    currentToken = nextToken;
    io.emit('currentTokenChanged', currentToken); 
  });

 

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
