import type { Metadata } from "next";
import { PageIntro, SectionHeading } from "@/components/page-intro";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { team } from "@/data/portal";

export const metadata: Metadata = { title: "Équipe et gouvernance" };

export default function TeamPage() {
  return (
    <>
      <PageIntro kicker="Équipe pilote" title="Des rôles distincts pour produire, relire et décider" description="Le responsable porte la vision. Le mainteneur organise le flux. Les contributeurs produisent. Les relecteurs contrôlent. La décision finale reste humaine." />
      <section className="mx-auto max-w-7xl px-5 py-18 lg:px-8 lg:py-24">
        <div className="border border-slate-300 bg-white p-3 sm:p-6">
          <Table>
            <TableHeader><TableRow><TableHead>Membre</TableHead><TableHead>Rôle principal</TableHead><TableHead>Rôle secondaire</TableHead></TableRow></TableHeader>
            <TableBody>{team.map((member) => <TableRow key={member.name}><TableCell className="font-black text-slate-950">{member.name}</TableCell><TableCell>{member.primary}</TableCell><TableCell>{member.secondary}</TableCell></TableRow>)}</TableBody>
          </Table>
        </div>
      </section>
      <section className="border-y border-slate-300 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-18 lg:px-8 lg:py-24">
          <SectionHeading kicker="Responsabilités" title="Qui décide quoi ?" />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Responsable", "Valide le cadrage, arbitre les désaccords et autorise le lancement."],
              ["Mainteneur", "Qualifie les Issues, organise les reviews et fusionne les contributions validées."],
              ["Relecteur", "Contrôle besoin, méthode, sources, droits, limites et reproductibilité."],
              ["Contributeur", "Produit, documente le rôle humain–IA, répond aux remarques et fournit les preuves."],
            ].map(([title, detail]) => <article key={title} className="metric-card"><h3 className="text-xl font-black text-slate-950">{title}</h3><p className="mt-4 text-sm leading-7 text-slate-600">{detail}</p></article>)}
          </div>
          <div className="mt-10 border-l-4 border-rose-400 bg-rose-50 p-6"><p className="text-xl font-black text-slate-950">Principe de décision</p><p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700">L’IA peut assister la rédaction, l’analyse et certains contrôles. Elle ne déclare pas une production vérifiée. Seules les contributions fusionnées dans <code className="bg-white px-1.5 py-0.5">main</code> sont officielles.</p></div>
        </div>
      </section>
    </>
  );
}

