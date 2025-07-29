import AdventureScene from './adventureScene.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'gameCanvas',
  backgroundColor: '#000000',
  scene: [AdventureScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  }
};

new Phaser.Game(config);
