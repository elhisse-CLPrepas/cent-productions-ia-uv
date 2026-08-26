"use client";

import Link from "next/link";
import { ExternalLink, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { repositoryUrl } from "@/data/portal";

const navigation = [
  ["Le projet", "/projet"],
  ["Productions", "/projets"],
  ["Tableau de bord", "/tableau-de-bord"],
  ["Méthode", "/methode"],
  ["Participer", "/contribuer"],
  ["Équipe", "/equipe"],
] as const;

function Brand() {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Accueil">
      <span className="grid size-10 place-items-center border border-cyan-300/30 bg-cyan-300 text-sm font-black text-slate-950 shadow-[4px_4px_0_#fb7185] transition-transform group-hover:-translate-y-0.5">
        100
      </span>
      <span className="leading-tight">
        <strong className="block text-sm tracking-tight text-white">Productions IA</strong>
        <span className="text-[11px] uppercase tracking-[0.17em] text-slate-400">Utiles + vérifiées</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07111f]/92 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Brand />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {navigation.map(([label, href]) => (
            <Link key={href} href={href} className="rounded-md px-3 py-2 text-sm text-slate-300 transition hover:bg-white/7 hover:text-white">
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Button asChild className="bg-rose-400 text-slate-950 hover:bg-rose-300">
            <a href={repositoryUrl} target="_blank" rel="noreferrer">
              Ouvrir GitHub <ExternalLink aria-hidden="true" />
            </a>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost" className="text-white hover:bg-white/10 hover:text-white lg:hidden" aria-label="Ouvrir le menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="border-white/10 bg-[#07111f] text-white">
            <SheetHeader>
              <SheetTitle className="text-white">100 Productions IA</SheetTitle>
              <SheetDescription className="text-slate-400">Explorer le projet et contribuer à votre niveau.</SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col px-4" aria-label="Navigation mobile">
              {navigation.map(([label, href]) => (
                <SheetClose key={href} asChild>
                  <Link href={href} className="border-b border-white/10 py-4 text-base text-slate-200 hover:text-cyan-300">
                    {label}
                  </Link>
                </SheetClose>
              ))}
              <a href={repositoryUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-rose-300">
                Ouvrir le dépôt <ExternalLink className="size-4" />
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

