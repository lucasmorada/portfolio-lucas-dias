"use client";

import { useEffect, useRef } from "react";

export default function GameCanvas() {
  const gameContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let game: { destroy: (removeCanvas?: boolean) => void } | null = null;
    let isMounted = true;

    async function startGame() {
      const Phaser = await import("phaser");

      if (!isMounted || !gameContainerRef.current) {
        return;
      }

      class MainScene extends Phaser.Scene {
        constructor() {
          super("MainScene");
        }

        create() {
          const width = this.scale.width;
          const height = this.scale.height;

          this.cameras.main.setBackgroundColor("#8fb3d9");

          this.add.rectangle(
            width / 2,
            height - 45,
            width,
            90,
            0x6f4e37
          );

          this.add.rectangle(
            width / 2,
            height - 90,
            width,
            12,
            0x5f6f45
          );

          this.add.text(
            width / 2,
            90,
            "Portfólio Lucas Dias",
            {
              fontFamily: "monospace",
              fontSize: "34px",
              color: "#f3ead8",
              backgroundColor: "#171717",
              padding: {
                x: 18,
                y: 12,
              },
            }
          ).setOrigin(0.5);

          this.add.text(
            width / 2,
            150,
            "Phaser rodando dentro do Next.js",
            {
              fontFamily: "monospace",
              fontSize: "18px",
              color: "#171717",
            }
          ).setOrigin(0.5);

          this.add.text(
            width / 2,
            height - 135,
            "Etapa 2 concluída",
            {
              fontFamily: "monospace",
              fontSize: "18px",
              color: "#ffffff",
            }
          ).setOrigin(0.5);
        }
      }

      game = new Phaser.Game({
        type: Phaser.AUTO,
        parent: gameContainerRef.current,
        width: 960,
        height: 540,
        backgroundColor: "#8fb3d9",
        pixelArt: true,
        physics: {
          default: "arcade",
          arcade: {
            gravity: {
              y: 700,
            },
            debug: false,
          },
        },
        scene: MainScene,
      });
    }

    startGame();

    return () => {
      isMounted = false;

      if (game) {
        game.destroy(true);
        game = null;
      }
    };
  }, []);

  return (
    <div className="w-full overflow-hidden rounded-2xl border-2 border-[#171717] bg-[#171717] p-2 shadow-[8px_8px_0px_#171717]">
      <div
        ref={gameContainerRef}
        className="mx-auto flex min-h-[540px] w-full max-w-[960px] items-center justify-center overflow-hidden rounded-xl bg-[#8fb3d9]"
      />
    </div>
  );
}