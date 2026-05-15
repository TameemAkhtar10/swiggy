require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;
const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

module.exports.io = io;

io.on("connection", (socket) => {
  socket.on("joinOrder", (orderId) => {
    socket.join(orderId.toString());
  });
});

connectDB();

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});