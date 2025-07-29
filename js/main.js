import MultiplayerScene from './adventureScene.js'; // You can rename this

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#000",
  scene: [MultiplayerScene],
  physics: {
    default: "arcade",
    arcade: { gravity: { y: 0 }, debug: false }
  }
};

new Phaser.Game(config);
