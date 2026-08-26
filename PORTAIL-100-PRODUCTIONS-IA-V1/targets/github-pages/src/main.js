import "./styles.css";

const repository = "https://github.com/elhisse-CLPrepas/cent-productions-ia-uv";
const categories = ["Enseigner et apprendre", "Organiser et gérer un projet", "Communiquer et présenter", "Produire des documents", "Résoudre un problème numérique"];
const workflow = [
  ["01", "Proposer", "Ouvrir une Issue avec le besoin, le bénéficiaire et le résultat."],
  ["02", "Qualifier", "Préciser catégorie, niveau, responsable, relecteur et date."],
  ["03", "Produire", "Créer une branche, compléter la fiche et ajouter le livrable."],
  ["04", "Contrôler", "Tester les liens, citer les sources et retirer les données sensibles."],
  ["05", "Ouvrir une PR", "Relier la Pull Request à l’Issue d’origine."],
  ["06", "Relire", "Traiter les remarques et documenter les décisions."],
  ["07", "Fusionner", "Fusionner après validation humaine et respect des critères."],
  ["08", "Publier", "Rendre la fiche accessible puis clôturer l’Issue."],
];

let projects = [];
let dashboard = null;
let query = "";
let category = "Toutes";
const app = document.querySelector("#app");

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]);
}

function pageIntro(kicker, title, description) {
  return `<section class="page-intro"><div class="wrap"><p class="eyebrow">${kicker}</p><h1>${title}</h1><p class="lead">${description}</p></div></section>`;
}

function projectCard(project) {
  return `<article class="project-card"><div class="card-top"><code>${escapeHtml(project.id)}</code><span>${escapeHtml(project.status)}</span></div><p class="category">${escapeHtml(project.category)}</p><h3>${escapeHtml(project.title)}</h3><p>${escapeHtml(project.summary)}</p><div class="progress"><i style="width:${Number(project.progress) || 0}%"></i></div><a href="#production/${encodeURIComponent(project.slug)}">Ouvrir la fiche →</a></article>`;
}

function renderHome() {
  app.innerHTML = `<section class="hero"><div class="wrap hero-grid"><div><p class="tag">Challenge 100 Jours · 25 septembre 2026</p><h1>100 productions IA <em>utiles</em> et <mark>vérifiées</mark></h1><p>Apprendre GitHub en contribuant à un projet réel, utile et ouvert. Chaque ressource part d’un besoin concret et passe par une validation humaine.</p><div class="actions"><a class="button primary" href="#projets">Explorer le portfolio →</a><a class="button ghost" href="#participer">Choisir mon niveau</a></div></div><aside><p class="eyebrow">État réel · 26 août 2026</p><div class="metrics"><div><b>0</b><span>Issues</span></div><div><b>0</b><span>Pull Requests</span></div><div><b>0</b><span>Validées</span></div><div><b>5</b><span>Propositions</span></div></div><p class="source">Données du dépôt vérifiées. Les propositions ne sont pas encore officielles.</p></aside></div></section><section class="promise">Un besoin réel → une méthode → une production → une vérification → un partage public</section><section class="wrap section"><p class="eyebrow teal">Portfolio pilote</p><h2>Cinq productions pour démarrer</h2><div class="cards">${projects.slice(0, 3).map(projectCard).join("")}</div></section><section class="dark-section"><div class="wrap"><p class="eyebrow">Workflow officiel</p><h2>Huit étapes. Une responsabilité humaine continue.</h2><ol class="workflow">${workflow.map(([n, title, text]) => `<li><code>${n}</code><h3>${title}</h3><p>${text}</p></li>`).join("")}</ol></div></section>`;
}

function renderProject() {
  app.innerHTML = `${pageIntro("Présentation", "Faire ensemble et apprendre en faisant", "Le dépôt devient un atelier, une mémoire collective et une vitrine de compétences.")}<section class="wrap section"><div class="two-cols"><article class="panel"><code>01</code><h2>Créer une communauté de collaboration</h2><p>Chaque membre contribue à son niveau. Issues, GitHub Projects et Pull Requests transforment les échanges en actions.</p></article><article class="panel dark"><code>02</code><h2>Apprendre les gestes d’un vrai projet</h2><p>Clarifier, planifier, produire, documenter, demander une review, corriger, valider puis publier.</p></article></div><h2 class="spaced">Cinq catégories pilotes</h2><div class="category-grid">${categories.map((item) => `<div>${item}</div>`).join("")}</div></section>`;
}

function renderProjects() {
  const needle = query.trim().toLocaleLowerCase("fr");
  const visible = projects.filter((project) => (category === "Toutes" || project.category === category) && (!needle || `${project.id} ${project.title} ${project.summary}`.toLocaleLowerCase("fr").includes(needle)));
  app.innerHTML = `${pageIntro("Portfolio", "Des besoins réels transformés en preuves", "Le catalogue commence avec cinq propositions pilotes. Une fiche devient officielle après Issue, Pull Request et review humaine.")}<section class="wrap section"><div class="filters"><label><span class="sr-only">Rechercher</span><input id="search" value="${escapeHtml(query)}" placeholder="Rechercher une production…"></label><label><span class="sr-only">Catégorie</span><select id="category"><option>Toutes</option>${categories.map((item) => `<option ${item === category ? "selected" : ""}>${item}</option>`).join("")}</select></label></div><p class="count">${visible.length} production(s) affichée(s) · données pilotes</p><div class="cards">${visible.map(projectCard).join("") || `<div class="empty">Aucun résultat. <button id="reset">Réinitialiser</button></div>`}</div></section>`;
  document.querySelector("#search")?.addEventListener("input", (event) => { query = event.target.value; renderProjects(); document.querySelector("#search")?.focus(); });
  document.querySelector("#category")?.addEventListener("change", (event) => { category = event.target.value; renderProjects(); });
  document.querySelector("#reset")?.addEventListener("click", () => { query = ""; category = "Toutes"; renderProjects(); });
}

function renderProduction(slug) {
  const project = projects.find((item) => item.slug === slug);
  if (!project) return renderNotFound();
  app.innerHTML = `<section class="detail-hero"><div class="wrap"><a href="#projets">← Retour au portfolio</a><div class="meta"><code>${escapeHtml(project.id)}</code><span>${escapeHtml(project.status)}</span><span>Pilote</span></div><h1>${escapeHtml(project.title)}</h1><p>${escapeHtml(project.summary)}</p></div></section><section class="wrap section detail-grid"><article class="panel"><p class="eyebrow teal">Cadrage</p><dl><dt>Besoin réel</dt><dd>${escapeHtml(project.need)}</dd><dt>Public</dt><dd>${escapeHtml(project.audience)}</dd><dt>Résultat attendu</dt><dd>${escapeHtml(project.result)}</dd><dt>Catégorie</dt><dd>${escapeHtml(project.category)}</dd><dt>Difficulté</dt><dd>${escapeHtml(project.difficulty)}</dd></dl></article><aside class="panel"><p class="eyebrow coral">État de préparation</p><strong class="big">${Number(project.progress) || 0}%</strong><div class="progress"><i style="width:${Number(project.progress) || 0}%"></i></div><p class="warning">Proposition non validée. Une Issue GitHub doit encore être créée.</p><a class="button primary" href="${repository}/issues/new?template=proposer-une-production.yml" target="_blank" rel="noreferrer">Créer l’Issue ↗</a></aside></section>`;
}

function renderDashboard() {
  const info = dashboard?.github ?? {};
  app.innerHTML = `${pageIntro("Pilotage", "Voir l’état réel. Préparer la progression.", "Les chiffres observés sont séparés des objectifs et propositions du portail.")}<section class="wrap section"><div class="notice">Snapshot du ${escapeHtml(dashboard?.snapshotDate || "26 août 2026")} · ${Number(info.issues) || 0} Issue · ${Number(info.pullRequests) || 0} Pull Request · ${Number(info.validatedProductions) || 0} validée</div><div class="metric-row"><div><b>0/100</b><span>Productions validées</span></div><div><b>${Number(info.issues) || 0}</b><span>Issues</span></div><div><b>${Number(info.pullRequests) || 0}</b><span>Pull Requests</span></div><div><b>${projects.length}</b><span>Propositions pilotes</span></div></div><div class="dashboard-panel"><p class="eyebrow teal">Objectif global</p><h2>0 <small>/ 100 validées</small></h2><div class="progress large"><i style="width:0%"></i></div><div class="milestones"><span><b>25</b>Premier mois</span><span><b>50</b>Mi-parcours</span><span><b>100</b>Fin du Challenge</span></div></div></section>`;
}

function renderMethod() {
  const criteria = [["Utilité", "Besoin réel, public identifié, résultat exploitable."], ["Méthode", "Étapes, outils, prompts et rôle humain documentés."], ["Vérification", "Faits contrôlés, liens testés, limites signalées."], ["Traçabilité", "Sources, droits, preuves et décisions accessibles."], ["Réutilisation", "Fichiers disponibles et conditions précisées."]];
  app.innerHTML = `${pageIntro("Méthode et validation", "Une production utile devient vérifiée après contrôle humain", "Une review humaine favorable est obligatoire. Deux avis sont requis pour un contenu sensible ou à fort impact.")}<section class="wrap section"><div class="quality-grid">${criteria.map(([title, text], index) => `<article><code>0${index + 1}</code><h3>${title}</h3><p>${text}</p></article>`).join("")}</div><div class="notice warning"><strong>Aucun push direct dans main.</strong> Toute production passe par une Issue, une branche dédiée et une Pull Request.</div><h2 class="spaced">Le parcours officiel</h2><ol class="workflow light">${workflow.map(([n, title, text]) => `<li><code>${n}</code><h3>${title}</h3><p>${text}</p></li>`).join("")}</ol></section>`;
}

function renderParticipate() {
  const levels = [["Découverte", "Proposer une idée, commenter ou suivre."], ["Contribution guidée", "Compléter une fiche officielle."], ["Contribution GitHub", "Créer une branche, des commits et une Pull Request."], ["Relecture", "Contrôler utilité, sources, droits et limites."], ["Maintenance", "Qualifier, organiser, arbitrer et publier."]];
  app.innerHTML = `${pageIntro("Participation", "Vous pouvez commencer sans être expert", "Choisissez un besoin réel puis entrez par le niveau qui vous convient.")}<section class="wrap section"><div class="quality-grid">${levels.map(([title, text], index) => `<article><code>0${index + 1}</code><h3>${title}</h3><p>${text}</p></article>`).join("")}</div><div class="actions center"><a class="button primary" href="${repository}/issues/new?template=proposer-une-production.yml" target="_blank" rel="noreferrer">Proposer une production ↗</a><a class="button outline" href="${repository}/issues/new?template=demander-aide.yml" target="_blank" rel="noreferrer">Demander de l’aide ↗</a><a class="button outline" href="${repository}/issues/new?template=signaler-une-correction.yml" target="_blank" rel="noreferrer">Signaler une correction ↗</a></div></section>`;
}

function renderNotFound() { app.innerHTML = `<section class="wrap section center"><p class="eyebrow teal">Erreur 404</p><h1>Cette page n’existe pas.</h1><a class="button primary" href="#projets">Retour au portfolio</a></section>`; }

function route() {
  const [routeName, slug] = location.hash.replace(/^#\/?/, "").split("/");
  const name = routeName || "accueil";
  ({ accueil: renderHome, projet: renderProject, projets: renderProjects, dashboard: renderDashboard, methode: renderMethod, participer: renderParticipate }[name] || (name === "production" ? () => renderProduction(decodeURIComponent(slug || "")) : renderNotFound))();
  window.scrollTo({ top: 0, behavior: "instant" });
}

async function init() {
  try {
    const config = await fetch("./config/portal.json").then((response) => { if (!response.ok) throw new Error("Configuration indisponible"); return response.json(); });
    const [catalogue, metrics] = await Promise.all([fetch(config.dataEndpoint).then((response) => response.json()), fetch(config.dashboardEndpoint).then((response) => response.json())]);
    projects = Array.isArray(catalogue.items) ? catalogue.items : [];
    dashboard = metrics;
    route();
  } catch (error) {
    app.innerHTML = `<section class="wrap section center"><h1>Le contenu n’a pas pu être chargé.</h1><p>${escapeHtml(error instanceof Error ? error.message : "Erreur inconnue")}</p><button class="button primary" onclick="location.reload()">Réessayer</button></section>`;
  }
}

window.addEventListener("hashchange", route);
init();
