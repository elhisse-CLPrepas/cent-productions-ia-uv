import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, ExternalLink, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { projects, repositoryUrl } from "@/data/portal";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return { title: project?.title ?? "Production introuvable", description: project?.summary };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <>
      <section className="bg-[#07111f] text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
          <Link href="/projets" className="inline-flex items-center gap-2 text-sm font-bold text-cyan-300 hover:text-cyan-200"><ArrowLeft className="size-4" /> Retour au portfolio</Link>
          <div className="mt-10 flex flex-wrap items-center gap-3"><span className="font-mono text-sm font-bold text-cyan-300">{project.id}</span><Badge variant="outline" className="border-white/20 text-white">{project.status}</Badge><Badge className="bg-rose-300 text-slate-950">Pilote</Badge></div>
          <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-[-.045em] sm:text-5xl lg:text-6xl">{project.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{project.summary}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-14 lg:grid-cols-[1.35fr_.65fr] lg:px-8 lg:py-20">
        <div className="space-y-8">
          <article className="border border-slate-300 bg-white p-6 lg:p-8">
            <p className="eyebrow text-cyan-700">Cadrage de la fiche</p>
            <dl className="mt-7 divide-y divide-slate-200">
              {[["Besoin réel", project.need], ["Public", project.audience], ["Résultat attendu", project.result], ["Catégorie", project.category], ["Difficulté", project.difficulty]].map(([term, value]) => (
                <div key={term} className="grid gap-2 py-5 sm:grid-cols-[11rem_1fr]"><dt className="text-sm font-bold text-slate-950">{term}</dt><dd className="text-sm leading-7 text-slate-600">{value}</dd></div>
              ))}
            </dl>
          </article>
          <article className="border border-slate-300 bg-white p-6 lg:p-8">
            <p className="eyebrow text-cyan-700">Contrôles prévus</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {project.controls.map((control) => <li key={control} className="flex gap-3 border border-slate-200 bg-slate-50 p-4 text-sm font-bold text-slate-700"><Check className="size-4 shrink-0 text-cyan-700" />{control}</li>)}
            </ul>
          </article>
        </div>
        <aside className="space-y-5">
          <div className="border border-slate-300 bg-white p-6">
            <p className="eyebrow text-rose-600">État de préparation</p>
            <p className="mt-5 text-4xl font-black text-slate-950">{project.progress}%</p>
            <Progress value={project.progress} className="mt-4 bg-slate-200 [&>div]:bg-cyan-600" />
            <dl className="mt-6 space-y-4 text-sm"><div><dt className="font-bold text-slate-950">Contributeur</dt><dd className="mt-1 text-slate-600">{project.owner}</dd></div><div><dt className="font-bold text-slate-950">Relecteur</dt><dd className="mt-1 text-slate-600">{project.reviewer}</dd></div></dl>
          </div>
          <div className="border border-amber-300 bg-amber-50 p-6">
            <ShieldAlert className="size-6 text-amber-700" />
            <p className="mt-4 font-black text-slate-950">Proposition non validée</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{project.sourceNote}. Cette fiche ne constitue pas encore une production officielle.</p>
          </div>
          <Button asChild className="w-full"><a href={`${repositoryUrl}/issues/new?template=proposer-une-production.yml`} target="_blank" rel="noreferrer">Créer l’Issue GitHub <ExternalLink /></a></Button>
        </aside>
      </section>
    </>
  );
}

