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
    <main className="min-h-screen bg-[#f3ead8] text-[#171717]">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-10">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-[#5f6f45]">
            Portfólio interativo 2D
          </p>

          <h1 className="mb-6 text-5xl font-black leading-tight tracking-tight text-[#1f1f1f] md:text-7xl">
            Portfólio Lucas Dias
          </h1>

          <p className="mb-8 max-w-2xl text-lg leading-8 text-[#3f3f3f]">
            Um portfólio em formato de jogo 2D side-scroller, com estética
            retrô, pixel art original e uma jornada interativa mostrando
            projetos, stacks, skills e contatos.
          </p>

          <div className="mb-10 flex flex-wrap gap-3">
            <span className="rounded-full bg-[#1f1f1f] px-4 py-2 text-sm font-semibold text-white">
              Next.js
            </span>
            <span className="rounded-full bg-[#6f4e37] px-4 py-2 text-sm font-semibold text-white">
              TypeScript
            </span>
            <span className="rounded-full bg-[#5f6f45] px-4 py-2 text-sm font-semibold text-white">
              Tailwind CSS
            </span>
            <span className="rounded-full bg-[#3d4f66] px-4 py-2 text-sm font-semibold text-white">
              Phaser 3
            </span>
          </div>

          <div className="flex flex-wrap gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border-2 border-[#171717] bg-white px-5 py-3 text-sm font-bold text-[#171717] shadow-[4px_4px_0px_#171717] transition hover:-translate-y-1 hover:shadow-[6px_6px_0px_#171717]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-2xl border-2 border-[#171717] bg-[#d8c7a5] p-6 shadow-[8px_8px_0px_#171717]">
          <h2 className="mb-3 text-2xl font-black">
            Status da jornada
          </h2>

          <p className="text-base leading-7 text-[#303030]">
            Etapa 1 funcionando. O projeto base foi criado com Next.js,
            TypeScript, Tailwind CSS e Phaser instalado. O próximo passo será
            renderizar o Phaser dentro desta página sem quebrar o SSR do Next.
          </p>
        </div>
      </section>
    </main>
  );
}