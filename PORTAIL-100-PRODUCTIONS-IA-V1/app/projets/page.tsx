import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { ProjectBrowser } from "@/components/project-browser";
import { projects } from "@/data/portal";

export const metadata: Metadata = { title: "Portfolio des productions" };

export default function ProjectsPage() {
  return (
    <>
      <PageIntro kicker="Portfolio" title="Des besoins réels transformés en preuves de compétence" description="Le catalogue commence avec cinq propositions pilotes. Une fiche ne devient officielle et publique qu’après son Issue, sa Pull Request et sa review humaine." />
      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <ProjectBrowser projects={projects} />
      </section>
    </>
  );
}

