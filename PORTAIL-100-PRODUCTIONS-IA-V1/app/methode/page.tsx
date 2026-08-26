import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2, FileCheck2, Scale, ShieldCheck } from "lucide-react";
import { PageIntro, SectionHeading } from "@/components/page-intro";
import { Button } from "@/components/ui/button";
import { qualityCriteria, workflow } from "@/data/portal";

export const metadata: Metadata = { title: "Méthode et qualité" };

export default function MethodPage() {
  return (
    <>
      <PageIntro kicker="Méthode et validation" title="Une production utile ne devient vérifiée qu’après contrôle humain" description="Le projet documente la méthode, les sources, les droits, les limites et les preuves. Une review humaine favorable est obligatoire. Deux avis sont requis pour les contenus sensibles ou à fort impact." />
      <section className="mx-auto max-w-7xl px-5 py-18 lg:px-8 lg:py-24">
        <SectionHeading kicker="Grille de qualité" title="Cinq critères avant publication" description="La qualité ne se résume pas à une belle sortie générée par l’IA. Elle doit être démontrée par des contrôles et une traçabilité." />
        <div className="mt-10 grid gap-px overflow-hidden border border-slate-300 bg-slate-300 md:grid-cols-2 lg:grid-cols-5">
          {qualityCriteria.map((criterion, index) => <article key={criterion.name} className="bg-white p-6"><span className="font-mono text-xs font-black text-cyan-700">0{index + 1}</span><h3 className="mt-5 text-xl font-black text-slate-950">{criterion.name}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{criterion.detail}</p></article>)}
        </div>
      </section>

      <section className="border-y border-slate-300 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-18 lg:grid-cols-[.8fr_1.2fr] lg:px-8 lg:py-24">
          <div>
            <p className="eyebrow text-cyan-700">Parcours officiel</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-.04em] text-slate-950">De l’idée à la publication</h2>
            <p className="mt-5 leading-8 text-slate-600">Le workflow garde la responsabilité, la preuve et le droit de correction visibles à chaque étape.</p>
            <div className="mt-8 border border-rose-300 bg-rose-50 p-5"><p className="font-black text-rose-900">Aucun push direct dans main.</p><p className="mt-2 text-sm leading-6 text-rose-800">Toute production passe par une Issue, une branche dédiée et une Pull Request.</p></div>
          </div>
          <ol className="grid gap-3 sm:grid-cols-2">
            {workflow.map((step) => <li key={step.number} className="flex gap-4 border border-slate-200 bg-slate-50 p-5"><span className="number-plate">{step.number}</span><div><h3 className="font-black text-slate-950">{step.label}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{step.detail}</p></div></li>)}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-18 lg:px-8 lg:py-24">
        <SectionHeading kicker="Garde-fous" title="Trois décisions que l’IA ne prend pas" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            [FileCheck2, "Déclarer une production vérifiée", "Seule une review humaine favorable permet d’avancer vers la validation."],
            [Scale, "Autoriser un contenu sensible", "Santé, droit, finances, sécurité ou données personnelles exigent deux avis humains."],
            [ShieldCheck, "Publier dans main", "Un mainteneur autorisé fusionne. Le responsable arbitre et autorise le lancement public."],
          ].map(([Icon, title, detail]) => { const CardIcon = Icon as typeof FileCheck2; return <article key={String(title)} className="metric-card"><CardIcon className="size-7 text-cyan-700" /><h3 className="mt-6 text-xl font-black text-slate-950">{String(title)}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{String(detail)}</p></article>; })}
        </div>
        <div className="mt-10 flex gap-4 border border-amber-300 bg-amber-50 p-6"><AlertTriangle className="size-6 shrink-0 text-amber-700" /><div><p className="font-black text-slate-950">Conditions obligatoires</p><p className="mt-2 text-sm leading-7 text-slate-700">Aucune donnée sensible. Aucune source majeure manquante. Aucune erreur bloquante connue. Liens et droits contrôlés. Limites documentées.</p></div></div>
      </section>

      <section className="bg-[#07111f] text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 py-14 md:flex-row md:items-center lg:px-8">
          <div className="flex gap-4"><CheckCircle2 className="mt-1 size-7 shrink-0 text-cyan-300" /><div><h2 className="text-2xl font-black">L’humain valide. GitHub conserve les preuves.</h2><p className="mt-2 text-sm leading-6 text-slate-300">Le public bénéficie d’un résultat dont le chemin de production reste consultable.</p></div></div>
          <Button asChild className="bg-rose-300 text-slate-950 hover:bg-rose-200"><Link href="/contribuer">Commencer à contribuer <ArrowRight /></Link></Button>
        </div>
      </section>
    </>
  );
}

