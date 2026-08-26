import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { repositoryUrl } from "@/data/portal";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#07111f] text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="eyebrow text-cyan-300">Challenge 100 Jours · Atelier LN-IA</p>
          <h2 className="mt-3 max-w-lg text-2xl font-black tracking-tight text-white">L’IA assiste. Le membre produit. Le collectif relit.</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">L’humain valide. GitHub conserve les preuves. Le public bénéficie du résultat.</p>
        </div>
        <div>
          <p className="text-sm font-bold text-white">Parcourir</p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link href="/projets" className="hover:text-cyan-300">Portfolio</Link>
            <Link href="/tableau-de-bord" className="hover:text-cyan-300">Tableau de bord</Link>
            <Link href="/methode" className="hover:text-cyan-300">Qualité et méthode</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold text-white">Projet source</p>
          <a href={repositoryUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm text-rose-300 hover:text-rose-200">
            cent-productions-ia-uv <ExternalLink className="size-4" />
          </a>
          <p className="mt-5 text-xs leading-5 text-slate-500">Code sous licence MIT. Contenus pédagogiques sous CC BY-SA 4.0 avec attribution à LN-IA.</p>
        </div>
      </div>
    </footer>
  );
}

