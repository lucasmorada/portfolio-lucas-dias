import type PhaserType from "phaser";

export function createPixelTextures(scene: PhaserType.Scene) {
  createPlayerTexture(scene);
  createGroundTexture(scene);
  createPlatformTexture(scene);
  createCloudTexture(scene);
  createMountainTexture(scene);
  createWoodSignTexture(scene);
}

function createPlayerTexture(scene: PhaserType.Scene) {
  const playerGraphics = scene.make.graphics({ x: 0, y: 0 }, false);

  playerGraphics.fillStyle(0x171717);
  playerGraphics.fillRect(10, 0, 14, 7);

  playerGraphics.fillStyle(0xb9825c);
  playerGraphics.fillRect(9, 7, 16, 13);

  playerGraphics.fillStyle(0x171717);
  playerGraphics.fillRect(13, 12, 3, 3);
  playerGraphics.fillRect(21, 12, 3, 3);

  playerGraphics.fillStyle(0x5f6f45);
  playerGraphics.fillRect(8, 20, 18, 16);

  playerGraphics.fillStyle(0x3f3f3f);
  playerGraphics.fillRect(5, 22, 4, 13);
  playerGraphics.fillRect(26, 22, 4, 13);

  playerGraphics.fillStyle(0x2f2f2f);
  playerGraphics.fillRect(10, 36, 6, 10);
  playerGraphics.fillRect(20, 36, 6, 10);

  playerGraphics.generateTexture("lucas-player", 36, 46);
  playerGraphics.destroy();
}

function createGroundTexture(scene: PhaserType.Scene) {
  const tileGraphics = scene.make.graphics({ x: 0, y: 0 }, false);

  tileGraphics.fillStyle(0x6f4e37);
  tileGraphics.fillRect(0, 0, 32, 32);

  tileGraphics.fillStyle(0x8a6346);
  tileGraphics.fillRect(0, 0, 32, 8);

  tileGraphics.fillStyle(0x5f6f45);
  tileGraphics.fillRect(0, 0, 32, 4);

  tileGraphics.lineStyle(1, 0x4b3425);
  tileGraphics.strokeRect(0, 0, 32, 32);

  tileGraphics.generateTexture("ground-tile", 32, 32);
  tileGraphics.destroy();
}

function createPlatformTexture(scene: PhaserType.Scene) {
  const platformGraphics = scene.make.graphics({ x: 0, y: 0 }, false);

  platformGraphics.fillStyle(0x3f3f3f);
  platformGraphics.fillRect(0, 0, 32, 16);

  platformGraphics.fillStyle(0x5a5a5a);
  platformGraphics.fillRect(0, 0, 32, 5);

  platformGraphics.lineStyle(1, 0x252525);
  platformGraphics.strokeRect(0, 0, 32, 16);

  platformGraphics.generateTexture("stone-platform", 32, 16);
  platformGraphics.destroy();
}

function createCloudTexture(scene: PhaserType.Scene) {
  const cloudGraphics = scene.make.graphics({ x: 0, y: 0 }, false);

  cloudGraphics.fillStyle(0xf3ead8);
  cloudGraphics.fillRect(8, 16, 64, 16);
  cloudGraphics.fillRect(20, 8, 36, 16);
  cloudGraphics.fillRect(34, 0, 28, 16);

  cloudGraphics.fillStyle(0xd8c7a5);
  cloudGraphics.fillRect(8, 28, 64, 4);

  cloudGraphics.generateTexture("pixel-cloud", 80, 40);
  cloudGraphics.destroy();
}

function createMountainTexture(scene: PhaserType.Scene) {
  const mountainGraphics = scene.make.graphics({ x: 0, y: 0 }, false);

  mountainGraphics.fillStyle(0x7c8065);
  mountainGraphics.fillTriangle(0, 120, 120, 0, 240, 120);

  mountainGraphics.fillStyle(0x5f6f45);
  mountainGraphics.fillTriangle(50, 120, 150, 25, 250, 120);

  mountainGraphics.fillStyle(0xf3ead8);
  mountainGraphics.fillTriangle(95, 25, 120, 0, 145, 25);
  mountainGraphics.fillTriangle(130, 45, 150, 25, 170, 45);

  mountainGraphics.generateTexture("pixel-mountain", 260, 120);
  mountainGraphics.destroy();
}

function createWoodSignTexture(scene: PhaserType.Scene) {
  const signGraphics = scene.make.graphics({ x: 0, y: 0 }, false);

  signGraphics.fillStyle(0x6f4e37);
  signGraphics.fillRect(8, 0, 80, 36);

  signGraphics.fillStyle(0x8a6346);
  signGraphics.fillRect(12, 5, 72, 8);

  signGraphics.fillStyle(0x4b3425);
  signGraphics.fillRect(42, 36, 12, 42);

  signGraphics.lineStyle(2, 0x171717);
  signGraphics.strokeRect(8, 0, 80, 36);
  signGraphics.strokeRect(42, 36, 12, 42);

  signGraphics.generateTexture("wood-sign", 96, 80);
  signGraphics.destroy();
}