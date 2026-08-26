import assert from "node:assert/strict";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({
  appType: "custom",
  configFile: false,
  root,
  resolve: { alias: { "@": root } },
  server: { middlewareMode: true },
});

after(async () => {
  await vite.close();
});

test("les cinq propositions pilotes ont des identifiants et slugs uniques", async () => {
  const { projects } = await vite.ssrLoadModule("/data/portal.ts");
  assert.equal(projects.length, 5);
  assert.equal(new Set(projects.map((item) => item.id)).size, 5);
  assert.equal(new Set(projects.map((item) => item.slug)).size, 5);
  assert.ok(projects.every((item) => item.pilot && !item.verified));
});

test("la carte signale le statut pilote sans annoncer de validation", async () => {
  const { projects } = await vite.ssrLoadModule("/data/portal.ts");
  const { ProjectCard } = await vite.ssrLoadModule("/components/project-card.tsx");
  const html = renderToStaticMarkup(React.createElement(ProjectCard, { project: projects[0] }));

  assert.match(html, /P001/);
  assert.match(html, /Idée proposée/);
  assert.match(html, /Préparation pilote/);
  assert.doesNotMatch(html, />Validée</);
});

test("le composant de progression transmet une valeur accessible", async () => {
  const { Progress } = await vite.ssrLoadModule("/components/ui/progress.tsx");
  const html = renderToStaticMarkup(React.createElement(Progress, { value: 10 }));
  assert.match(html, /aria-valuenow="10"/);
});
