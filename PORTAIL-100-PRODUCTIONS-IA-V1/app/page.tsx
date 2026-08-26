import Link from "next/link";
import { ArrowRight, CheckCircle2, ExternalLink, GitPullRequest, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/page-intro";
import { projects, repositoryUrl, roadmap, workflow } from "@/data/portal";

export default function Home() {
  return (
    <>
      <section className="dot-grid-dark overflow-hidden bg-[#07111f] text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.22fr_.78fr] lg:px-8 lg:py-24">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[.14em] text-cyan-200">Challenge 100 Jours</span>
              <span className="text-xs uppercase tracking-[.14em] text-slate-400">Lancement · 25 septembre 2026</span>
            </div>
            <h1 className="mt-8 max-w-4xl text-5xl font-black leading-[.98] tracking-[-.055em] sm:text-6xl lg:text-7xl">
              100 productions IA <span className="text-cyan-300">utiles</span> et <span className="text-rose-300">vérifiées</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">Apprendre GitHub en contribuant à un projet réel, utile et ouvert. Chaque ressource part d’un besoin concret et passe par une validation humaine.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-cyan-300 text-slate-950 hover:bg-cyan-200">
                <Link href="/projets">Explorer le portfolio <ArrowRight /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                <Link href="/contribuer">Choisir mon niveau</Link>
              </Button>
            </div>
          </div>
          <aside className="relative self-end border border-white/15 bg-[#0b1a2c]/90 p-6 shadow-[12px_12px_0_rgba(103,232,249,.16)] lg:p-8" aria-label="État vérifié du dépôt">
            <p className="eyebrow text-cyan-300">État réel · 26 août 2026</p>
            <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10">
              {[
                ["0", "Issues"], ["0", "Pull Requests"], ["0", "Productions validées"], ["5", "Propositions pilotes"],
              ].map(([value, label]) => (
                <div key={label} className="bg-[#0b1a2c] p-5">
                  <p className="text-3xl font-black text-white">{value}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-7">
              <div className="mb-2 flex items-center justify-between text-xs text-slate-400"><span>Objectif public</span><span>0 / 100 validées</span></div>
              <Progress value={0} className="bg-white/10 [&>div]:bg-cyan-300" />
            </div>
            <a href={repositoryUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-rose-300 hover:text-rose-200">
              Consulter la source GitHub <ExternalLink className="size-4" />
            </a>
          </aside>
        </div>
      </section>

      <section className="border-b border-slate-300 bg-cyan-100">
        <div className="mx-auto max-w-7xl px-5 py-6 lg:px-8">
          <p className="text-center text-lg font-black tracking-tight text-slate-950">Un besoin réel <span className="px-2 text-cyan-700">→</span> une méthode <span className="px-2 text-cyan-700">→</span> une production <span className="px-2 text-cyan-700">→</span> une vérification <span className="px-2 text-cyan-700">→</span> un partage public</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-18 lg:px-8 lg:py-24">
        <SectionHeading kicker="Le projet en une minute" title="Un atelier, une mémoire collective, une vitrine de compétences" description="Le dépôt organise la production. GitHub Projects rend l’avancement visible. Les Pull Requests conservent les reviews. Le portail rend uniquement les résultats validés accessibles au public." />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            [Users, "Faire ensemble", "Chaque membre entre selon son niveau puis progresse par la pratique et les retours."],
            [GitPullRequest, "Apprendre GitHub", "Issues, branches, commits, Pull Requests et reviews deviennent des gestes de projet."],
            [ShieldCheck, "Vérifier avant de publier", "Une review humaine est obligatoire. Deux avis sont requis pour un contenu sensible."],
          ].map(([Icon, title, description]) => {
            const CardIcon = Icon as typeof Users;
            return (
              <article key={String(title)} className="metric-card">
                <CardIcon className="size-7 text-cyan-700" />
                <h3 className="mt-6 text-xl font-black text-slate-950">{String(title)}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{String(description)}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-slate-300 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-18 lg:px-8 lg:py-24">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading kicker="Portfolio pilote" title="Cinq productions pour démarrer" description="Ces fiches sont des propositions de lancement. Elles ne sont pas encore des Issues ni des productions validées." />
            <Button asChild variant="outline"><Link href="/projets">Voir tout le portfolio <ArrowRight /></Link></Button>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.slice(0, 3).map((project) => <ProjectCard key={project.id} project={project} />)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-18 lg:px-8 lg:py-24">
        <SectionHeading kicker="Workflow officiel" title="Huit étapes. Une responsabilité humaine continue." description="Aucun push direct dans main. Chaque production part d’une Issue, utilise une branche dédiée et reçoit une review humaine." />
        <ol className="mt-12 grid gap-px overflow-hidden border border-slate-300 bg-slate-300 md:grid-cols-2 lg:grid-cols-4">
          {workflow.map((step) => (
            <li key={step.number} className="bg-white p-6">
              <span className="font-mono text-xs font-bold text-cyan-700">{step.number}</span>
              <h3 className="mt-4 text-lg font-black text-slate-950">{step.label}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-[#0b1a2c] text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-18 lg:grid-cols-[.75fr_1.25fr] lg:px-8 lg:py-24">
          <div>
            <p className="eyebrow text-rose-300">Feuille de route</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-.04em]">Du dépôt pilote au lancement public</h2>
            <p className="mt-5 text-base leading-7 text-slate-300">Chaque jalon doit laisser une preuve. Le portail signale l’état réel sans confondre préparation, validation et publication.</p>
          </div>
          <ol className="border-l border-white/15">
            {roadmap.map((item) => (
              <li key={item.period} className="relative border-b border-white/10 py-5 pl-8 first:pt-0 last:border-0 last:pb-0">
                <span className="absolute -left-1.5 top-6 size-3 rounded-full bg-cyan-300 first:top-1" />
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div><p className="text-sm font-bold text-cyan-200">{item.period}</p><p className="mt-1 text-base font-bold text-white">{item.label}</p></div>
                  <span className="w-fit border border-white/15 px-2 py-1 text-xs text-slate-300">{item.status}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-18 text-center lg:px-8 lg:py-24">
        <CheckCircle2 className="mx-auto size-9 text-cyan-700" />
        <p className="eyebrow mt-5 text-cyan-700">Appel à participation</p>
        <h2 className="mt-4 text-4xl font-black tracking-[-.04em] text-slate-950 sm:text-5xl">Pas besoin d’être expert de GitHub ou de l’IA.</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">Commencez par proposer, commenter, tester ou relire. Le projet est conçu pour vous faire progresser vers une contribution complète.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg"><Link href="/contribuer">Trouver mon point d’entrée <ArrowRight /></Link></Button>
          <Button asChild size="lg" variant="outline"><Link href="/projet">Comprendre le projet</Link></Button>
        </div>
      </section>
    </>
  );
}
