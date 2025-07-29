// OnlyKombat Multiplayer Client – Connects to Render backend
// Uses socket.io CDN and modular functions

const socket = io("https://onlykombat-ws.onrender.com");

// Log successful connection
socket.on("connect", () => {
  console.log("✅ Connected to multiplayer server:", socket.id);
});

/**
 * Call this to join matchmaking queue.
 * @param {function} callback - Called with list of matched players.
 */
export function joinMatchmaking(callback) {
  socket.emit("joinQueue");
  socket.on("matchFound", (players) => {
    console.log("🎮 Match found:", players);
    callback(players);
  });
}

/**
 * Sends a player action to the opponent via the server.
 * @param {string} room - The match room ID
 * @param {object} data - Action data (e.g., move, punch)
 */
export function sendPlayerAction(room, data) {
  socket.emit("action", { room, data });
}

/**
 * Listens for actions from the opponent.
 * @param {function} callback - Called when opponent sends an action
 */
export function receiveOpponentAction(callback) {
  socket.on("opponentAction", (data) => {
    callback(data);
  });
}
