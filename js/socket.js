import { io } from "https://cdn.socket.io/4.5.4/socket.io.esm.min.js";

const socket = io("https://onlykombat-ws.onrender.com");

socket.emit("joinQueue");

socket.on("matchFound", (players) => {
  console.log("🎮 Match found:", players);
});

function sendAction(data) {
  socket.emit("action", { room: "room_placeholder", data });
}

socket.on("opponentAction", (data) => {
  console.log("👊 Opponent action:", data);
});
