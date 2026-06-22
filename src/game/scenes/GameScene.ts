import type PhaserType from "phaser";
import { GAME_EVENTS } from "@/src/game/events";
import { createPixelTextures } from "@/src/game/utils/createTextures";

export function createGameScene(Phaser: typeof import("phaser")) {
  return class GameScene extends Phaser.Scene {
    private player?: PhaserType.Physics.Arcade.Sprite;
    private platforms?: PhaserType.Physics.Arcade.StaticGroup;
    private cursors?: PhaserType.Types.Input.Keyboard.CursorKeys;
    private keys?: Record<string, PhaserType.Input.Keyboard.Key>;
    private isGameStarted = false;
    private startGameHandler?: () => void;

    private readonly worldWidth = 3600;
    private readonly worldHeight = 720;

    constructor() {
      super("GameScene");
    }

    create() {
      createPixelTextures(this);

      this.createWorld();
      this.createPlayer();
      this.createControls();
      this.configureCamera();
      this.listenToReactEvents();
    }

    update() {
      if (!this.player || !this.cursors || !this.keys) {
        return;
      }

      if (!this.isGameStarted) {
        this.player.setVelocityX(0);
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
      const runSpeed = 310;
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
        this.player.setVelocityY(-520);
      }
    }

    private listenToReactEvents() {
      this.startGameHandler = () => {
        this.isGameStarted = true;
      };

      window.addEventListener(GAME_EVENTS.START_GAME, this.startGameHandler);

      this.events.once("shutdown", () => {
        this.removeReactEvents();
      });

      this.events.once("destroy", () => {
        this.removeReactEvents();
      });
    }

    private removeReactEvents() {
      if (!this.startGameHandler) {
        return;
      }

      window.removeEventListener(GAME_EVENTS.START_GAME, this.startGameHandler);
      this.startGameHandler = undefined;
    }

    private createWorld() {
      const screenHeight = this.scale.height;

      this.physics.world.setBounds(0, 0, this.worldWidth, this.worldHeight);
      this.cameras.main.setBounds(0, 0, this.worldWidth, this.worldHeight);
      this.cameras.main.setBackgroundColor("#8fb3d9");

      this.createBackground(screenHeight);
      this.createLevelText();
      this.createPlatforms(screenHeight);
      this.createSigns(screenHeight);
    }

    private createBackground(screenHeight: number) {
      this.add
        .rectangle(
          this.worldWidth / 2,
          this.worldHeight / 2,
          this.worldWidth,
          this.worldHeight,
          0x8fb3d9
        )
        .setOrigin(0.5);

      this.add
        .rectangle(
          this.worldWidth / 2,
          this.worldHeight - 90,
          this.worldWidth,
          180,
          0xd8c7a5
        )
        .setOrigin(0.5);

      for (let x = 140; x < this.worldWidth; x += 520) {
        this.add
          .image(x, 130, "pixel-cloud")
          .setOrigin(0.5)
          .setScrollFactor(0.35);
      }

      for (let x = 80; x < this.worldWidth; x += 320) {
        this.add
          .image(x, screenHeight - 170, "pixel-mountain")
          .setOrigin(0.5, 1)
          .setScrollFactor(0.55);
      }

      for (let x = 0; x < this.worldWidth; x += 220) {
        this.add
          .rectangle(x, screenHeight - 96, 110, 42, 0x7c8065)
          .setOrigin(0, 1)
          .setScrollFactor(0.75);

        this.add
          .rectangle(x + 70, screenHeight - 96, 90, 58, 0x5f6f45)
          .setOrigin(0, 1)
          .setScrollFactor(0.75);
      }
    }

    private createLevelText() {
      this.add
        .text(110, 70, "Portfólio Lucas Dias", {
          fontFamily: "monospace",
          fontSize: "32px",
          color: "#f3ead8",
          backgroundColor: "#171717",
          padding: {
            x: 18,
            y: 12,
          },
        })
        .setScrollFactor(1);

      this.add
        .text(112, 132, "Etapa 6: overlay inicial", {
          fontFamily: "monospace",
          fontSize: "18px",
          color: "#171717",
        })
        .setScrollFactor(1);

      this.add
        .text(
          112,
          165,
          "Clique em Iniciar Jornada para liberar os controles",
          {
            fontFamily: "monospace",
            fontSize: "16px",
            color: "#171717",
          }
        )
        .setScrollFactor(1);
    }

    private createPlatforms(screenHeight: number) {
      this.platforms = this.physics.add.staticGroup();

      const groundY = screenHeight - 32;

      for (let x = 16; x < this.worldWidth; x += 32) {
        const tile = this.platforms
          .create(x, groundY, "ground-tile")
          .setOrigin(0.5, 0.5) as PhaserType.Physics.Arcade.Sprite;

        tile.refreshBody();
      }

      this.createPlatform(420, screenHeight - 155, 5);
      this.createPlatform(760, screenHeight - 240, 4);
      this.createPlatform(1120, screenHeight - 165, 6);
      this.createPlatform(1510, screenHeight - 255, 5);
      this.createPlatform(1910, screenHeight - 185, 4);
      this.createPlatform(2320, screenHeight - 270, 6);
      this.createPlatform(2820, screenHeight - 190, 5);
      this.createPlatform(3220, screenHeight - 255, 4);
    }

    private createPlatform(x: number, y: number, blocks: number) {
      if (!this.platforms) {
        return;
      }

      const startX = x - (blocks * 32) / 2;

      for (let index = 0; index < blocks; index++) {
        const tile = this.platforms
          .create(startX + index * 32, y, "stone-platform")
          .setOrigin(0.5, 0.5) as PhaserType.Physics.Arcade.Sprite;

        tile.refreshBody();
      }
    }

    private createSigns(screenHeight: number) {
      const signPositions = [
        {
          x: 260,
          title: "Início da jornada",
        },
        {
          x: 1050,
          title: "Área de Stacks",
        },
        {
          x: 1850,
          title: "Projetos",
        },
        {
          x: 2850,
          title: "Skills",
        },
        {
          x: 3400,
          title: "Final",
        },
      ];

      signPositions.forEach((sign) => {
        this.add
          .image(sign.x, screenHeight - 102, "wood-sign")
          .setOrigin(0.5, 1);

        this.add
          .text(sign.x, screenHeight - 177, sign.title, {
            fontFamily: "monospace",
            fontSize: "14px",
            color: "#171717",
            backgroundColor: "#f3ead8",
            padding: {
              x: 8,
              y: 5,
            },
          })
          .setOrigin(0.5);
      });
    }

    private createPlayer() {
      if (!this.platforms) {
        return;
      }

      const screenHeight = this.scale.height;

      this.player = this.physics.add.sprite(
        120,
        screenHeight - 120,
        "lucas-player"
      );

      this.player.setCollideWorldBounds(true);
      this.player.setBounce(0);
      this.player.setDragX(1200);
      this.player.setMaxVelocity(340, 760);

      const body = this.player.body as PhaserType.Physics.Arcade.Body;
      body.setSize(24, 42);
      body.setOffset(6, 4);

      this.physics.add.collider(this.player, this.platforms);
    }

    private configureCamera() {
      if (!this.player) {
        return;
      }

      this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
      this.cameras.main.setDeadzone(160, 90);
      this.cameras.main.setZoom(1);
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