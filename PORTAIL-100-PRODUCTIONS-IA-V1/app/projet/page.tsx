import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, BrainCircuit, BriefcaseBusiness, GraduationCap, Presentation, Wrench } from "lucide-react";
import { PageIntro, SectionHeading } from "@/components/page-intro";
import { Button } from "@/components/ui/button";
import { projectCategories, roadmap } from "@/data/portal";

export const metadata: Metadata = { title: "Le projet" };

const categoryIcons = [GraduationCap, BriefcaseBusiness, Presentation, BookOpenCheck, Wrench];

export default function ProjectPage() {
  return (
    <>
      <PageIntro kicker="Présentation" title="Faire ensemble et apprendre en faisant" description="Le projet réunit les membres du Challenge 100 Jours autour de 100 ressources IA utiles, responsables, réutilisables et vérifiées. Le dépôt devient à la fois un atelier, une mémoire collective et une vitrine de compétences." actions={<><Button asChild><Link href="/projets">Voir les productions <ArrowRight /></Link></Button><Button asChild variant="outline"><Link href="/contribuer">Participer</Link></Button></>} />

      <section className="mx-auto max-w-7xl px-5 py-18 lg:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-2">
          <article className="border border-slate-300 bg-white p-7 lg:p-10">
            <span className="number-plate">01</span>
            <h2 className="mt-8 text-3xl font-black tracking-tight text-slate-950">Créer une communauté de collaboration</h2>
            <p className="mt-5 leading-8 text-slate-600">Chaque membre contribue à son niveau. Les idées, méthodes, difficultés et retours deviennent des actions avec Issues et GitHub Projects.</p>
            <ul className="mt-7 space-y-3 text-sm text-slate-700">
              {[
                "Travailler en sécurité avec branches et forks",
                "Faire relire les productions dans les Pull Requests",
                "Partager questions et apprentissages dans Discussions",
                "Publier uniquement les résultats validés",
              ].map((item) => <li key={item} className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 bg-cyan-600" />{item}</li>)}
            </ul>
          </article>
          <article className="border border-slate-300 bg-[#07111f] p-7 text-white lg:p-10">
            <span className="number-plate border-rose-300 text-rose-300">02</span>
            <h2 className="mt-8 text-3xl font-black tracking-tight">Apprendre les gestes d’un vrai projet numérique</h2>
            <p className="mt-5 leading-8 text-slate-300">Clarifier, planifier, produire, documenter, demander une review, corriger, valider puis publier.</p>
            <ul className="mt-7 space-y-3 text-sm text-slate-300">
              {[
                "Cadrer un besoin, un public et un résultat",
                "Piloter avec statuts et échéances",
                "Documenter un workflow humain–IA",
                "Contrôler sources, droits, données et limites",
              ].map((item) => <li key={item} className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 bg-rose-300" />{item}</li>)}
            </ul>
          </article>
        </div>
      </section>

      <section className="border-y border-slate-300 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-18 lg:px-8 lg:py-24">
          <SectionHeading kicker="Périmètre pilote" title="Cinq catégories accessibles pour démarrer" description="Le dépôt prévoit dix catégories à terme. Le pilote concentre l’apprentissage sur les cinq domaines validés le 18 août 2026." />
          <div className="mt-10 grid gap-px overflow-hidden border border-slate-300 bg-slate-300 md:grid-cols-2 lg:grid-cols-5">
            {projectCategories.map((category, index) => {
              const Icon = categoryIcons[index];
              return <article key={category} className="bg-[#f8fbfc] p-6"><Icon className="size-6 text-cyan-700" /><p className="mt-6 font-black leading-6 text-slate-950">{category}</p></article>;
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-18 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow text-cyan-700">Calendrier de lancement</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-.04em] text-slate-950">Cinq jalons avant l’accueil public</h2>
            <p className="mt-5 leading-8 text-slate-600">Le portail sera enrichi au rythme des Issues, reviews et productions réellement validées.</p>
          </div>
          <ol className="space-y-3">
            {roadmap.map((item, index) => (
              <li key={item.period} className="grid gap-3 border border-slate-300 bg-white p-5 sm:grid-cols-[3rem_1fr_auto] sm:items-center">
                <span className="font-mono text-sm font-black text-cyan-700">0{index + 1}</span>
                <div><p className="font-black text-slate-950">{item.label}</p><p className="mt-1 text-sm text-slate-500">{item.period}</p></div>
                <span className="w-fit bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">{item.status}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-slate-300 bg-cyan-100">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 px-5 py-12 md:flex-row md:items-center lg:px-8">
          <div className="flex gap-4"><BrainCircuit className="mt-1 size-7 shrink-0 text-cyan-800" /><div><p className="text-xl font-black text-slate-950">L’humain garde la responsabilité finale.</p><p className="mt-2 text-sm leading-6 text-slate-700">Une IA ne peut pas déclarer seule une production vérifiée.</p></div></div>
          <Button asChild><Link href="/methode">Voir les règles de qualité <ArrowRight /></Link></Button>
        </div>
      </section>
    </>
  );
}

