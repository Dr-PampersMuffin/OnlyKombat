export default class AdventureScene extends Phaser.Scene {
  constructor() {
    super({ key: 'AdventureScene' });
  }

  preload() {
    this.load.image("spider", "assets/sprites/spider.png");
    this.load.image("bg1", "assets/arenas/kuwaiti_sandpit.png");
    this.load.image("echo_vanta", "assets/sprites/echo_vanta.png");
  }

  create() {
    this.add.image(400, 300, "bg1");
    this.enemy = this.physics.add.sprite(600, 300, "spider").setScale(2);
    this.player = this.physics.add.sprite(200, 300, "echo_vanta").setScale(2);

    this.physics.add.collider(this.player, this.enemy, this.handleHit, null, this);

    this.input.keyboard.on("keydown-SPACE", () => {
      this.enemy.setVelocityX(-200);
    });
  }

  handleHit() {
    this.enemy.destroy();
    this.scene.start("NextStageScene");
  }
}
