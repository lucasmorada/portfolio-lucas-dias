"use client";

import dynamic from "next/dynamic";

const GameCanvas = dynamic(() => import("@/components/GameCanvas"), {
  ssr: false,
  loading: () => (
    <main className="flex min-h-screen items-center justify-center bg-[#171717] text-white">
      Carregando jogo...
    </main>
  ),
});

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-[#171717]">
      <GameCanvas />
    </main>
  );
}