import * as Phaser from 'phaser';
import { GameScene } from './scenes/GameScene';
import { StartScene } from './scenes/StartScene';

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#f0ffff',
  parent: 'minesweeper',
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [StartScene, GameScene],
};

window.addEventListener('load', () => {
  const game = new Phaser.Game(config);
});
