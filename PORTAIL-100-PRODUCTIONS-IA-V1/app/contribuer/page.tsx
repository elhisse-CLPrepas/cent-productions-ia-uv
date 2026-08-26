import type { Metadata } from "next";
import { ExternalLink, GitBranch, HelpCircle, MessageSquareWarning, Rocket } from "lucide-react";
import { PageIntro, SectionHeading } from "@/components/page-intro";
import { Button } from "@/components/ui/button";
import { contributionLevels, repositoryUrl } from "@/data/portal";

export const metadata: Metadata = { title: "Participer" };

export default function ContributePage() {
  return (
    <>
      <PageIntro kicker="Participation" title="Vous pouvez commencer sans être expert" description="Choisissez un besoin réel puis entrez par le niveau qui vous convient. Le collectif vous aide à progresser vers une contribution GitHub complète." />
      <section className="mx-auto max-w-7xl px-5 py-18 lg:px-8 lg:py-24">
        <SectionHeading kicker="Cinq points d’entrée" title="Une place pour chaque niveau" />
        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {contributionLevels.map((item, index) => <li key={item.level} className="border border-slate-300 bg-white p-6"><span className="font-mono text-xs font-black text-cyan-700">0{index + 1}</span><h3 className="mt-5 text-xl font-black text-slate-950">{item.level}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{item.action}</p></li>)}
        </ol>
      </section>

      <section className="border-y border-slate-300 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-18 lg:px-8 lg:py-24">
          <SectionHeading kicker="Actions GitHub" title="Transformez votre intention en action traçable" description="Les formulaires officiels du dépôt vous guident. Ils évitent les Issues vides et facilitent la qualification par le mainteneur." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <article className="project-card"><Rocket className="size-7 text-cyan-700" /><h3 className="mt-6 text-2xl font-black text-slate-950">Proposer une production</h3><p className="mt-3 text-sm leading-7 text-slate-600">Décrire le besoin, le bénéficiaire, le résultat attendu et votre niveau GitHub.</p><Button asChild className="mt-7 w-full"><a href={`${repositoryUrl}/issues/new?template=proposer-une-production.yml`} target="_blank" rel="noreferrer">Ouvrir le formulaire <ExternalLink /></a></Button></article>
            <article className="project-card"><HelpCircle className="size-7 text-cyan-700" /><h3 className="mt-6 text-2xl font-black text-slate-950">Demander de l’aide</h3><p className="mt-3 text-sm leading-7 text-slate-600">Signaler un blocage précis et expliquer ce que vous avez déjà tenté.</p><Button asChild variant="outline" className="mt-7 w-full"><a href={`${repositoryUrl}/issues/new?template=demander-aide.yml`} target="_blank" rel="noreferrer">Demander un appui <ExternalLink /></a></Button></article>
            <article className="project-card"><MessageSquareWarning className="size-7 text-cyan-700" /><h3 className="mt-6 text-2xl font-black text-slate-950">Signaler une correction</h3><p className="mt-3 text-sm leading-7 text-slate-600">Indiquer une erreur, un lien cassé ou une amélioration nécessaire.</p><Button asChild variant="outline" className="mt-7 w-full"><a href={`${repositoryUrl}/issues/new?template=signaler-une-correction.yml`} target="_blank" rel="noreferrer">Signaler un point <ExternalLink /></a></Button></article>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-18 lg:grid-cols-[.8fr_1.2fr] lg:px-8 lg:py-24">
        <div><GitBranch className="size-8 text-cyan-700" /><h2 className="mt-6 text-4xl font-black tracking-[-.04em] text-slate-950">Préparez votre première contribution</h2><p className="mt-5 leading-8 text-slate-600">Une production principale par Pull Request. Une branche dédiée. Des sources et preuves accessibles.</p></div>
        <ol className="space-y-3">
          {[
            "Choisir un besoin réel et un public bénéficiaire",
            "Ouvrir l’Issue avec le formulaire officiel",
            "Attendre la qualification et l’affectation",
            "Créer une branche contribution/PXXX-titre-court",
            "Compléter la fiche, ajouter le livrable et les preuves",
            "Ouvrir une Pull Request liée à l’Issue",
            "Traiter les observations puis attendre la validation",
          ].map((item, index) => <li key={item} className="flex gap-4 border-b border-slate-300 py-4"><span className="font-mono text-xs font-black text-cyan-700">0{index + 1}</span><p className="text-sm font-bold text-slate-800">{item}</p></li>)}
        </ol>
      </section>
    </>
  );
}

