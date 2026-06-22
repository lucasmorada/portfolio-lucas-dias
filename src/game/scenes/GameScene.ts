import type PhaserType from "phaser";
import { createPixelTextures } from "@/src/game/utils/createTextures";

export function createGameScene(Phaser: typeof import("phaser")) {
  return class GameScene extends Phaser.Scene {
    private player?: PhaserType.Physics.Arcade.Sprite;
    private platforms?: PhaserType.Physics.Arcade.StaticGroup;
    private cursors?: PhaserType.Types.Input.Keyboard.CursorKeys;
    private keys?: Record<string, PhaserType.Input.Keyboard.Key>;

    constructor() {
      super("GameScene");
    }

    create() {
      createPixelTextures(this);

      this.createWorld();
      this.createPlayer();
      this.createControls();
    }

    update() {
      if (!this.player || !this.cursors || !this.keys) {
        return;
      }

      const body = this.player.body as PhaserType.Physics.Arcade.Body;

      const isTouchingGround = body.blocked.down || body.touching.down;

      const movingLeft = this.cursors.left.isDown || this.keys.a.isDown;
      const movingRight = this.cursors.right.isDown || this.keys.d.isDown;

      const wantsToJump =
        this.cursors.space.isDown ||
        this.cursors.up.isDown ||
        this.keys.w.isDown;

      const isRunning = this.keys.shift.isDown;

      const walkSpeed = 190;
      const runSpeed = 290;
      const speed = isRunning ? runSpeed : walkSpeed;

      if (movingLeft) {
        this.player.setVelocityX(-speed);
        this.player.setFlipX(true);
      } else if (movingRight) {
        this.player.setVelocityX(speed);
        this.player.setFlipX(false);
      } else {
        this.player.setVelocityX(0);
      }

      if (wantsToJump && isTouchingGround) {
        this.player.setVelocityY(-500);
      }
    }

    private createWorld() {
      const width = this.scale.width;
      const height = this.scale.height;

      this.cameras.main.setBackgroundColor("#8fb3d9");

      this.add
        .text(width / 2, 70, "Portfólio Lucas Dias", {
          fontFamily: "monospace",
          fontSize: "34px",
          color: "#f3ead8",
          backgroundColor: "#171717",
          padding: {
            x: 18,
            y: 12,
          },
        })
        .setOrigin(0.5);

      this.add
        .text(width / 2, 125, "Etapa 4: código organizado", {
          fontFamily: "monospace",
          fontSize: "18px",
          color: "#171717",
        })
        .setOrigin(0.5);

      this.add
        .text(
          width / 2,
          165,
          "A/D ou setas: andar  |  Shift: correr  |  Espaço/W: pular",
          {
            fontFamily: "monospace",
            fontSize: "16px",
            color: "#171717",
          }
        )
        .setOrigin(0.5);

      this.platforms = this.physics.add.staticGroup();

      const groundY = height - 32;

      for (let x = 16; x < width; x += 32) {
        const tile = this.platforms
          .create(x, groundY, "ground-tile")
          .setOrigin(0.5, 0.5);

        tile.refreshBody();
      }

      this.createPlatform(width * 0.38, height - 160, 5);
      this.createPlatform(width * 0.68, height - 250, 4);
    }

    private createPlatform(x: number, y: number, blocks: number) {
      if (!this.platforms) {
        return;
      }

      const startX = x - (blocks * 32) / 2;

      for (let index = 0; index < blocks; index++) {
        const tile = this.platforms
          .create(startX + index * 32, y, "stone-platform")
          .setOrigin(0.5, 0.5);

        tile.refreshBody();
      }
    }

    private createPlayer() {
      if (!this.platforms) {
        return;
      }

      const height = this.scale.height;

      this.player = this.physics.add.sprite(120, height - 120, "lucas-player");

      this.player.setCollideWorldBounds(true);
      this.player.setBounce(0);
      this.player.setDragX(1200);
      this.player.setMaxVelocity(320, 700);

      const body = this.player.body as PhaserType.Physics.Arcade.Body;
      body.setSize(24, 42);
      body.setOffset(6, 4);

      this.physics.add.collider(this.player, this.platforms);
    }

    private createControls() {
      if (!this.input.keyboard) {
        return;
      }

      this.cursors = this.input.keyboard.createCursorKeys();

      this.keys = {
        a: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        d: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        w: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        shift: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT),
      };
    }
  };
}