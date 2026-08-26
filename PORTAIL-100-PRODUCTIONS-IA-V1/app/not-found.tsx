import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return <section className="mx-auto max-w-3xl px-5 py-28 text-center"><p className="font-mono text-sm font-bold text-cyan-700">ERREUR 404</p><h1 className="mt-4 text-5xl font-black tracking-tight text-slate-950">Cette page n’existe pas.</h1><p className="mt-5 text-lg text-slate-600">Revenez au portfolio pour retrouver les productions du projet.</p><Button asChild className="mt-8"><Link href="/projets"><ArrowLeft /> Retour au portfolio</Link></Button></section>;
}

