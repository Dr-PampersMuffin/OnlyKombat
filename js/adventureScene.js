import {
  joinMatchmaking,
  sendPlayerAction,
  receiveOpponentAction
} from './socket.js'; // assumes same /js/ folder

export default class AdventureScene extends Phaser.Scene {
  constructor() {
    super({ key: 'AdventureScene' });
    this.roomId = null;
  }

  preload() {
    this.load.image("bg", "assets/arenas/kuwaiti_sandpit.png");
    this.load.image("player1", "assets/sprites/echo_vanta.png");
    this.load.image("player2", "assets/sprites/pyronyx.png");
  }

  create() {
    this.add.image(400, 300, "bg");
    this.player = this.physics.add.sprite(200, 300, "player1").setScale(2);
    this.opponent = this.physics.add.sprite(600, 300, "player2").setScale(2);

    // Join matchmaking
    joinMatchmaking((players) => {
      console.log("Matched:", players);
      this.roomId = `room_${players[0]}`; // or however your backend defines rooms
    });

    // Keyboard movement + broadcast
    this.cursors = this.input.keyboard.createCursorKeys();

    this.input.keyboard.on("keydown", (e) => {
      if (!this.roomId) return;

      if (e.code === "ArrowRight") {
        this.player.x += 10;
        sendPlayerAction(this.roomId, { action: "moveRight" });
      }
      if (e.code === "ArrowLeft") {
        this.player.x -= 10;
        sendPlayerAction(this.roomId, { action: "moveLeft" });
      }
    });

    // Receive opponent moves
    receiveOpponentAction((data) => {
      if (data.action === "moveRight") this.opponent.x += 10;
      if (data.action === "moveLeft") this.opponent.x -= 10;
    });
  }

  update() {
    // Optional real-time updates here
  }
}
