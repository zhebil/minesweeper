/* eslint-disable @typescript-eslint/no-var-requires */
const spritesheetPng = require('../../assets/spritesheet.png');
const spritesheetJson = require('./../../assets/spritesheet.json');

enum Texts {
  Title = 'Minesweeper HTML5',
  Message = 'Click anywhere to start',
}
enum Styles {
  Color = '#008080',
  Font = 'Arial',
}

export class StartScene extends Phaser.Scene {
  constructor() {
    super('Start');
  }
  public preload(): void {
    this.load.atlas(
      'spritesheet',
      '../../assets/spritesheet.png',
      spritesheetJson
    );
  }
  public create(): void {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    this.add
      .text(centerX, centerY - 100, Texts.Title, {
        font: `52px ${Styles.Font}`,
        color: Styles.Color,
      })
      .setOrigin(0.5);
    this.add
      .text(centerX, centerY + 100, Texts.Message, {
        font: `28px ${Styles.Font}`,
        color: Styles.Color,
      })
      .setOrigin(0.5);
    this.input.once('pointerdown', () => {
      this.scene.start('Game');
    });
  }
}
