"use client";

import { useEffect, useRef } from "react";
import type PhaserType from "phaser";

export default function GameCanvas() {
  const gameContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let game: PhaserType.Game | null = null;
    let isMounted = true;

    async function startGame() {
      const Phaser = await import("phaser");
      const { createGameConfig } = await import("@/src/game/config");

      if (!isMounted || !gameContainerRef.current) {
        return;
      }

      const config = createGameConfig(Phaser, gameContainerRef.current);

      game = new Phaser.Game(config);
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
    <div
      ref={gameContainerRef}
      className="h-screen w-screen overflow-hidden bg-[#171717]"
    />
  );
}