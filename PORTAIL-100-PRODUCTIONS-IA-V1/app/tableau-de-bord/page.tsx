import type { Metadata } from "next";
import { AlertCircle, CalendarClock, CircleDot, GitPullRequest, ShieldCheck, Target } from "lucide-react";
import { PageIntro, SectionHeading } from "@/components/page-intro";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { projectCategories, projects, projectStatuses, roadmap } from "@/data/portal";

export const metadata: Metadata = { title: "Tableau de bord" };

const statusCounts = projectStatuses.map((status) => ({ status, count: projects.filter((project) => project.status === status).length }));

export default function DashboardPage() {
  return (
    <>
      <PageIntro kicker="Pilotage" title="Voir l’état réel. Préparer la progression." description="Le tableau de bord sépare les métriques observées dans le dépôt des objectifs de lancement. Les cinq fiches visibles sont des propositions pilotes et non des productions GitHub validées." />
      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <div className="flex flex-wrap items-center gap-3 border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950"><AlertCircle className="size-5" /><strong>Snapshot vérifié le 26 août 2026.</strong><span>0 Issue, 0 Pull Request, 0 production validée. GitHub Pages et Discussions ne sont pas encore activés.</span></div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            [Target, "0 / 100", "Productions validées"],
            [CircleDot, "0", "Issues dans le dépôt"],
            [GitPullRequest, "0", "Pull Requests"],
            [ShieldCheck, "5", "Propositions pilotes"],
          ].map(([Icon, value, label]) => {
            const MetricIcon = Icon as typeof Target;
            return <article key={String(label)} className="metric-card"><MetricIcon className="size-6 text-cyan-700" /><p className="mt-7 text-4xl font-black tracking-tight text-slate-950">{String(value)}</p><p className="mt-2 text-sm font-bold text-slate-500">{String(label)}</p></article>;
          })}
        </div>

        <Tabs defaultValue="progression" className="mt-12">
          <TabsList variant="line" className="mb-8 flex h-auto w-full justify-start gap-5 overflow-x-auto border-b border-slate-300">
            <TabsTrigger value="progression" className="px-1 pb-3">Progression</TabsTrigger>
            <TabsTrigger value="statuts" className="px-1 pb-3">Statuts</TabsTrigger>
            <TabsTrigger value="categories" className="px-1 pb-3">Catégories</TabsTrigger>
            <TabsTrigger value="jalons" className="px-1 pb-3">Jalons</TabsTrigger>
          </TabsList>
          <TabsContent value="progression">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
              <article className="border border-slate-300 bg-white p-6 lg:p-8">
                <p className="eyebrow text-cyan-700">Objectif global</p>
                <div className="mt-6 flex items-end justify-between"><p className="text-6xl font-black tracking-[-.06em] text-slate-950">0<span className="text-3xl text-slate-400">/100</span></p><p className="text-sm font-bold text-slate-500">0% validé</p></div>
                <Progress value={0} className="mt-6 h-3 bg-slate-200 [&>div]:bg-cyan-600" />
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[["25", "Premier mois"], ["50", "Mi-parcours"], ["100", "Fin du Challenge"]].map(([value, label]) => <div key={value} className="border border-slate-200 bg-slate-50 p-4"><p className="text-2xl font-black text-slate-950">{value}</p><p className="mt-1 text-xs text-slate-500">{label}</p></div>)}
                </div>
              </article>
              <article className="border border-slate-300 bg-[#07111f] p-6 text-white lg:p-8">
                <CalendarClock className="size-7 text-rose-300" />
                <p className="mt-8 text-sm font-bold text-cyan-300">Prochain jalon</p>
                <h2 className="mt-2 text-3xl font-black">Pilote avec cinq contributions</h2>
                <p className="mt-4 text-sm leading-7 text-slate-300">Du 1 au 10 septembre 2026. Les cinq propositions doivent devenir des Issues qualifiées avant de compter comme contributions ouvertes.</p>
              </article>
            </div>
          </TabsContent>
          <TabsContent value="statuts">
            <div className="border border-slate-300 bg-white p-3 sm:p-6">
              <Table>
                <TableHeader><TableRow><TableHead>Statut prévu</TableHead><TableHead className="text-right">Propositions portail</TableHead><TableHead className="text-right">Données GitHub</TableHead></TableRow></TableHeader>
                <TableBody>{statusCounts.map((row) => <TableRow key={row.status}><TableCell className="font-bold">{row.status}</TableCell><TableCell className="text-right">{row.count}</TableCell><TableCell className="text-right">0</TableCell></TableRow>)}</TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="categories">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {projectCategories.map((category) => {
                const count = projects.filter((project) => project.category === category).length;
                return <article key={category} className="border border-slate-300 bg-white p-5"><p className="text-4xl font-black text-cyan-700">{count}</p><p className="mt-3 text-sm font-bold leading-6 text-slate-950">{category}</p><p className="mt-2 text-xs text-slate-500">proposition pilote</p></article>;
              })}
            </div>
          </TabsContent>
          <TabsContent value="jalons">
            <div className="border border-slate-300 bg-white p-3 sm:p-6">
              <Table>
                <TableHeader><TableRow><TableHead>Période</TableHead><TableHead>Jalon</TableHead><TableHead>État</TableHead></TableRow></TableHeader>
                <TableBody>{roadmap.map((item) => <TableRow key={item.period}><TableCell className="font-mono text-xs">{item.period}</TableCell><TableCell className="font-bold">{item.label}</TableCell><TableCell>{item.status}</TableCell></TableRow>)}</TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <section className="border-t border-slate-300 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
          <SectionHeading kicker="Source des données" title="Un tableau de bord administrable sans inventer de chiffres" description="La V1 charge des fichiers JSON versionnés. Une synchronisation GitHub Actions pourra ensuite produire un snapshot public des Issues, Pull Requests et champs du Project." />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[["JSON statique", "Fonctionne sur GitHub Pages et conserve le dernier état validé."], ["PHP optionnel", "Sert le même catalogue sur cPanel sans devenir un outil d’administration parallèle."], ["GitHub source", "Issues, reviews et branches restent les preuves officielles."]].map(([title, detail]) => <article key={title} className="border-l-4 border-cyan-600 bg-slate-50 p-5"><h3 className="font-black text-slate-950">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p></article>)}
          </div>
        </div>
      </section>
    </>
  );
}

