"use client";

import dynamic from "next/dynamic";

const GameCanvas = dynamic(() => import("@/components/GameCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[540px] w-full items-center justify-center rounded-2xl border-2 border-[#171717] bg-[#d8c7a5] text-lg font-bold text-[#171717] shadow-[8px_8px_0px_#171717]">
      Carregando jogo...
    </div>
  ),
});

const links = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/lucasdiassiqueira/",
  },
  {
    label: "GitHub",
    href: "https://github.com/lucasmorada",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/diaswzj",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/5541999016634",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f3ead8] px-6 py-8 text-[#171717]">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-6 rounded-2xl border-2 border-[#171717] bg-white p-6 shadow-[8px_8px_0px_#171717] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-sm font-black uppercase tracking-[0.3em] text-[#5f6f45]">
              Portfólio interativo 2D
            </p>

            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              Portfólio Lucas Dias
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-[#3f3f3f]">
              Primeiro teste do Phaser dentro do Next.js. Nesta etapa, o canvas
              precisa aparecer sem erro de SSR.
            </p>
          </div>

          <nav className="flex flex-wrap gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border-2 border-[#171717] bg-[#f3ead8] px-4 py-2 text-sm font-bold text-[#171717] shadow-[4px_4px_0px_#171717] transition hover:-translate-y-1 hover:shadow-[6px_6px_0px_#171717]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </header>

        <GameCanvas />
      </section>
    </main>
  );
}