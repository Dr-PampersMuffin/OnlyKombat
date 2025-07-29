const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer();
const io = new Server(server, { cors: { origin: "*" } });

let rooms = {};

io.on("connection", (socket) => {
  console.log(`Player connected: ${socket.id}`);

  socket.on("joinQueue", () => {
    const availableRoom = Object.keys(rooms).find(r => rooms[r].length === 1);
    if (availableRoom) {
      rooms[availableRoom].push(socket.id);
      socket.join(availableRoom);
      io.to(availableRoom).emit("matchFound", rooms[availableRoom]);
    } else {
      const roomId = `room_${socket.id}`;
      rooms[roomId] = [socket.id];
      socket.join(roomId);
    }
  });

  socket.on("action", ({ room, data }) => {
    socket.to(room).emit("opponentAction", data);
  });

  socket.on("disconnect", () => {
    for (const [room, players] of Object.entries(rooms)) {
      rooms[room] = players.filter(id => id !== socket.id);
      if (rooms[room].length === 0) delete rooms[room];
    }
  });
});

server.listen(3000, () => console.log("Socket.IO server running on port 3000"));
