"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProjectCard } from "@/components/project-card";
import { projectCategories, type Project } from "@/data/portal";

export function ProjectBrowser({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Toutes");

  const visible = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("fr");
    return projects.filter((project) => {
      const categoryMatches = category === "Toutes" || project.category === category;
      const textMatches = !needle || `${project.id} ${project.title} ${project.summary} ${project.category}`.toLocaleLowerCase("fr").includes(needle);
      return categoryMatches && textMatches;
    });
  }, [category, projects, query]);

  return (
    <div>
      <div className="control-bar">
        <label className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <span className="sr-only">Rechercher une production</span>
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher par titre, numéro ou besoin…" className="h-11 border-slate-300 bg-white pl-10" />
        </label>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-slate-500" aria-hidden="true" />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="h-11 min-w-56 border-slate-300 bg-white"><SelectValue placeholder="Catégorie" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Toutes">Toutes les catégories</SelectItem>
              {projectCategories.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
        <p>{visible.length} production{visible.length > 1 ? "s" : ""} affichée{visible.length > 1 ? "s" : ""}</p>
        <p className="hidden sm:block">Données pilotes · aucune publication validée à ce jour</p>
      </div>
      {visible.length ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      ) : (
        <div className="mt-8 border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="font-bold text-slate-950">Aucune production ne correspond à cette recherche.</p>
          <button onClick={() => { setQuery(""); setCategory("Toutes"); }} className="mt-3 text-sm font-bold text-cyan-700 hover:underline">Réinitialiser les filtres</button>
        </div>
      )}
    </div>
  );
}

