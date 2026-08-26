import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { Project } from "@/data/portal";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card group flex h-full flex-col">
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-sm font-bold text-cyan-700">{project.id}</span>
        <Badge variant="outline" className="border-slate-300 bg-white text-slate-700">{project.status}</Badge>
      </div>
      <p className="mt-6 text-xs font-bold uppercase tracking-[0.17em] text-rose-600">{project.category}</p>
      <h3 className="mt-3 text-2xl font-black leading-tight tracking-[-0.025em] text-slate-950">{project.title}</h3>
      <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">{project.summary}</p>
      <div className="mt-6">
        <div className="mb-2 flex justify-between text-xs text-slate-500">
          <span>Préparation pilote</span><span>{project.progress}%</span>
        </div>
        <Progress value={project.progress} className="bg-slate-200 [&>div]:bg-cyan-600" />
      </div>
      <Link href={`/projets/${project.slug}`} className="mt-7 inline-flex items-center gap-2 border-t border-slate-200 pt-5 text-sm font-bold text-slate-950 group-hover:text-cyan-700">
        Ouvrir la fiche <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </Link>
    </article>
  );
}

