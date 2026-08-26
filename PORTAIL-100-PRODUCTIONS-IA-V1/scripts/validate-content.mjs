import { readFile } from "node:fs/promises";

const projectPath = new URL("../public/data/projects.json", import.meta.url);
const dashboardPath = new URL("../public/data/dashboard.json", import.meta.url);
const projectData = JSON.parse(await readFile(projectPath, "utf8"));
const dashboard = JSON.parse(await readFile(dashboardPath, "utf8"));

const allowedStatuses = new Set(["Idée proposée", "À clarifier", "Prête à produire", "En production", "En revue", "Corrections demandées", "Validée", "Publiée"]);
const ids = new Set();
const slugs = new Set();
const failures = [];

if (projectData.schemaVersion !== "1.0") failures.push("projects.json: schemaVersion doit valoir 1.0");
if (!Array.isArray(projectData.items)) failures.push("projects.json: items doit être un tableau");

for (const [index, item] of (projectData.items ?? []).entries()) {
  const ref = `projects.json items[${index}]`;
  if (!/^P\d{3}$/.test(item.id ?? "")) failures.push(`${ref}: identifiant PXXX invalide`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug ?? "")) failures.push(`${ref}: slug invalide`);
  if (ids.has(item.id)) failures.push(`${ref}: identifiant dupliqué ${item.id}`);
  if (slugs.has(item.slug)) failures.push(`${ref}: slug dupliqué ${item.slug}`);
  if (!allowedStatuses.has(item.status)) failures.push(`${ref}: statut invalide`);
  if (typeof item.progress !== "number" || item.progress < 0 || item.progress > 100) failures.push(`${ref}: progression invalide`);
  if (item.verified && !["Validée", "Publiée"].includes(item.status)) failures.push(`${ref}: verified=true exige un statut Validée ou Publiée`);
  ids.add(item.id);
  slugs.add(item.slug);
}

if (dashboard.goal !== 100) failures.push("dashboard.json: l’objectif doit valoir 100");
if (dashboard.github.validatedProductions > dashboard.goal) failures.push("dashboard.json: productions validées supérieures à l’objectif");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Contenu valide: ${projectData.items.length} propositions, snapshot ${dashboard.snapshotDate}.`);

