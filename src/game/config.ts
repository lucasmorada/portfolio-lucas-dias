import type PhaserType from "phaser";
import { createGameScene } from "@/src/game/scenes/GameScene";

export function createGameConfig(
  Phaser: typeof import("phaser"),
  parent: HTMLElement
): PhaserType.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    parent,
    width: parent.clientWidth || window.innerWidth,
    height: parent.clientHeight || window.innerHeight,
    backgroundColor: "#8fb3d9",
    pixelArt: true,
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
      default: "arcade",
      arcade: {
        gravity: {
          x: 0,
          y: 900,
        },
        debug: false,
      },
    },
    scene: [createGameScene(Phaser)],
  };
}