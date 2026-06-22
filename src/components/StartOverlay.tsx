"use client";

type StartOverlayProps = {
  onStart: () => void;
};

export default function StartOverlay({ onStart }: StartOverlayProps) {
  return (
    <div className="pointer-events-auto absolute inset-0 z-20 flex items-center justify-center bg-[#171717]/45 px-6 backdrop-blur-[2px]">
      <div className="w-full max-w-3xl rounded-3xl border-2 border-[#171717] bg-[#f3ead8] p-8 text-center shadow-[10px_10px_0px_#171717] md:p-12">
        <p className="mb-4 text-sm font-black uppercase tracking-[0.35em] text-[#5f6f45]">
          Jornada interativa
        </p>

        <h1 className="mb-5 text-5xl font-black leading-tight text-[#171717] md:text-7xl">
          Portfólio Lucas Dias
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-[#3f3f3f] md:text-lg">
          Explore minha trajetória, projetos, stacks e habilidades em uma fase
          2D criada com Next.js, TypeScript, Tailwind CSS e Phaser.
        </p>

        <button
          type="button"
          onClick={onStart}
          className="rounded-2xl border-2 border-[#171717] bg-[#5f6f45] px-8 py-4 text-base font-black uppercase tracking-[0.12em] text-white shadow-[6px_6px_0px_#171717] transition hover:-translate-y-1 hover:shadow-[8px_8px_0px_#171717] active:translate-y-0 active:shadow-[4px_4px_0px_#171717]"
        >
          Iniciar Jornada
        </button>

        <p className="mt-6 text-sm font-semibold text-[#555]">
          A/D ou setas para andar, Espaço ou W para pular, Shift para correr.
        </p>
      </div>
    </div>
  );
}