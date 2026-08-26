import type { ReactNode } from "react";

export function PageIntro({ kicker, title, description, actions }: { kicker: string; title: string; description: string; actions?: ReactNode }) {
  return (
    <section className="page-intro">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <p className="eyebrow text-cyan-700">{kicker}</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{description}</p>
        {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </section>
  );
}

export function SectionHeading({ kicker, title, description }: { kicker: string; title: string; description?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow text-cyan-700">{kicker}</p>
      <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-slate-600">{description}</p> : null}
    </div>
  );
}

