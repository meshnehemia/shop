// ws/socket.js
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

function setupWebSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173', // 🔁 Your React frontend origin
      methods: ['GET', 'POST'],
      credentials: true
    },
    transports: ['websocket', 'polling'],
  });

  io.use(async (socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('Authentication error'));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      await User.findByIdAndUpdate(decoded.id, { lastLogin: new Date() }); // update last seen
      next();
    } catch (err) {
      return next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`✅ User connected: ${socket.user.username} (${socket.id})`);

    socket.on('disconnect', () => {
      console.log(`❌ User disconnected: ${socket.user.username} (${socket.id})`);
    });

    // Example custom event
    socket.on('user-online', (data) => {
      console.log(`🟢 ${data.username} is online`);
    });

    socket.emit('ping', '🛰️ Connected to WebSocket');
  });
}

module.exports = setupWebSocket;
