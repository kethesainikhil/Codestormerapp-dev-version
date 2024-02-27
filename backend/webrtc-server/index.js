// webrtc-server/index.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const SimplePeer = require('./bundle.js'); // Updated path to the bundled simple-peer
const cors = require('cors');
const app = express();
const allowedOrigin = 'http://localhost:5173'; // Replace with your frontend app's URL

const corsOptions = {
  origin: allowedOrigin,
  credentials: true,
};

app.use(cors(corsOptions));
const server = http.createServer(app);
const io = socketIo(server);

const peers = {};

io.on('connection', (socket) => {
  socket.on('join-room', ({ roomId, signalData }) => {
    if (!peers[roomId]) {
      peers[roomId] = new SimplePeer({ initiator: false, trickle: false });

      peers[roomId].on('signal', (data) => {
        io.to(roomId).emit('signal', { signalData: data });
      });

      peers[roomId].on('data', (data) => {
        // Handle data communication if needed
      });

      peers[roomId].on('stream', (stream) => {
        io.to(roomId).emit('stream', { stream });
      });
    }

    peers[roomId].signal(signalData);
    socket.join(roomId);
  });

  socket.on('disconnect', () => {
    // Handle disconnect event if needed
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`WebRTC server is running on port ${PORT}`);
});
