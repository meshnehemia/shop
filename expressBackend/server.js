const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');
const setupWebSocket = require('./ws/socket');
require('dotenv').config();

const server = http.createServer(app);

connectDB();
setupWebSocket(server);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
