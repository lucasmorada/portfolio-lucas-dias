"use client";

import { useEffect, useRef, useState } from "react";
import type PhaserType from "phaser";
import StartOverlay from "@/src/components/StartOverlay";
import { GAME_EVENTS } from "@/src/game/events";

export default function GameCanvas() {
  const gameContainerRef = useRef<HTMLDivElement | null>(null);
  const [showStartOverlay, setShowStartOverlay] = useState(true);

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

  function handleStartGame() {
    window.dispatchEvent(new Event(GAME_EVENTS.START_GAME));
    setShowStartOverlay(false);
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#171717]">
      <div
        ref={gameContainerRef}
        className="h-screen w-screen overflow-hidden bg-[#171717]"
      />

      {showStartOverlay && <StartOverlay onStart={handleStartGame} />}
    </div>
  );
}