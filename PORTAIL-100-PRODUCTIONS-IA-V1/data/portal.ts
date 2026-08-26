export type ProjectStatus =
  | "Idée proposée"
  | "À clarifier"
  | "Prête à produire"
  | "En production"
  | "En revue"
  | "Corrections demandées"
  | "Validée"
  | "Publiée";

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  need: string;
  audience: string;
  result: string;
  status: ProjectStatus;
  difficulty: "Découverte" | "Guidée" | "Autonome" | "Avancée";
  owner: string;
  reviewer: string;
  progress: number;
  verified: boolean;
  pilot: boolean;
  sourceNote: string;
  controls: string[];
};

export const repositoryUrl =
  "https://github.com/elhisse-CLPrepas/cent-productions-ia-uv";

export const projectCategories = [
  "Enseigner et apprendre",
  "Organiser et gérer un projet",
  "Communiquer et présenter",
  "Produire des documents",
  "Résoudre un problème numérique",
] as const;

export const projects: Project[] = [
  {
    id: "P001",
    slug: "generer-fiche-pedagogique-verifiee",
    title: "Générer une fiche pédagogique vérifiée",
    category: "Enseigner et apprendre",
    summary:
      "Transformer un objectif d’apprentissage en fiche prête à tester avec sources, contrôles et rôle humain explicites.",
    need:
      "Un formateur doit produire plus vite sans abandonner la cohérence pédagogique ni la vérification.",
    audience: "Enseignants, formateurs et coachs",
    result: "Fiche pédagogique, grille de contrôle et preuve de test",
    status: "Idée proposée",
    difficulty: "Guidée",
    owner: "Équipe pilote",
    reviewer: "À affecter",
    progress: 10,
    verified: false,
    pilot: true,
    sourceNote: "Proposition éditoriale du portail — Issue GitHub à créer",
    controls: ["Objectif mesurable", "Sources citées", "Test utilisateur"],
  },
  {
    id: "P002",
    slug: "piloter-projet-avec-github-projects",
    title: "Piloter un projet avec GitHub Projects",
    category: "Organiser et gérer un projet",
    summary:
      "Mettre en place statuts, champs, vues et jalons pour rendre le travail collectif visible et actionnable.",
    need:
      "Une équipe débutante doit savoir où en est chaque production et quelle action vient ensuite.",
    audience: "Chefs de projet, mainteneurs et contributeurs",
    result: "Tableau de pilotage, vues recommandées et guide d’usage",
    status: "Idée proposée",
    difficulty: "Guidée",
    owner: "Équipe pilote",
    reviewer: "À affecter",
    progress: 10,
    verified: false,
    pilot: true,
    sourceNote: "Proposition éditoriale du portail — Issue GitHub à créer",
    controls: ["Champs documentés", "Workflow testé", "Accès contrôlés"],
  },
  {
    id: "P003",
    slug: "preparer-presentation-ia-sourcee",
    title: "Préparer une présentation IA sourcée",
    category: "Communiquer et présenter",
    summary:
      "Construire un support clair qui sépare faits, interprétations, apports de l’IA et décisions humaines.",
    need:
      "Un professionnel veut présenter un sujet IA sans diffuser des affirmations non vérifiées.",
    audience: "Managers, coachs, formateurs et porteurs de projet",
    result: "Présentation, notes de sources et rapport de vérification",
    status: "Idée proposée",
    difficulty: "Autonome",
    owner: "Équipe pilote",
    reviewer: "À affecter",
    progress: 10,
    verified: false,
    pilot: true,
    sourceNote: "Proposition éditoriale du portail — Issue GitHub à créer",
    controls: ["Sources primaires", "Droits visuels", "Relecture humaine"],
  },
  {
    id: "P004",
    slug: "assembler-guide-professionnel",
    title: "Assembler un guide professionnel contrôlé",
    category: "Produire des documents",
    summary:
      "Passer de contenus dispersés à un document structuré, lisible et accompagné de preuves de contrôle.",
    need:
      "Un groupe produit plusieurs fragments et doit livrer une version cohérente et réutilisable.",
    audience: "Formateurs, éditeurs et équipes projet",
    result: "Guide final, sources, checklist et journal des décisions",
    status: "Idée proposée",
    difficulty: "Autonome",
    owner: "Équipe pilote",
    reviewer: "À affecter",
    progress: 10,
    verified: false,
    pilot: true,
    sourceNote: "Proposition éditoriale du portail — Issue GitHub à créer",
    controls: ["Structure validée", "Liens testés", "Contrôle visuel"],
  },
  {
    id: "P005",
    slug: "resoudre-blocage-codex-vscode",
    title: "Résoudre un blocage Codex dans VS Code",
    category: "Résoudre un problème numérique",
    summary:
      "Documenter un diagnostic reproductible pour un environnement lourd ou surchargé d’extensions.",
    need:
      "Un utilisateur ne parvient plus à démarrer son assistant de production dans VS Code.",
    audience: "Débutants GitHub, formateurs et utilisateurs de VS Code",
    result: "Procédure de diagnostic, actions sûres et preuve de rétablissement",
    status: "Idée proposée",
    difficulty: "Guidée",
    owner: "Équipe pilote",
    reviewer: "À affecter",
    progress: 10,
    verified: false,
    pilot: true,
    sourceNote: "Proposition éditoriale du portail — Issue GitHub à créer",
    controls: ["Sauvegarde préalable", "Étapes réversibles", "Test de démarrage"],
  },
];

export const workflow = [
  { number: "01", label: "Proposer", detail: "Ouvrir une Issue avec le besoin, le bénéficiaire et le résultat." },
  { number: "02", label: "Qualifier", detail: "Préciser catégorie, niveau, responsable, relecteur et date." },
  { number: "03", label: "Produire", detail: "Créer une branche, compléter la fiche et ajouter le livrable." },
  { number: "04", label: "Contrôler", detail: "Tester les liens, citer les sources et retirer les données sensibles." },
  { number: "05", label: "Ouvrir une PR", detail: "Relier la Pull Request à l’Issue d’origine." },
  { number: "06", label: "Relire", detail: "Traiter les remarques et documenter les décisions." },
  { number: "07", label: "Fusionner", detail: "Fusionner après validation humaine et respect des critères." },
  { number: "08", label: "Publier", detail: "Rendre la fiche accessible puis clôturer l’Issue." },
] as const;

export const roadmap = [
  { period: "25–31 août 2026", label: "Construction GitHub", status: "En cours" },
  { period: "1–10 septembre 2026", label: "Pilote avec cinq contributions", status: "À venir" },
  { period: "11–20 septembre 2026", label: "Mini-site GitHub Pages", status: "À venir" },
  { period: "21–24 septembre 2026", label: "Simulation et validation finale", status: "À venir" },
  { period: "25 septembre 2026", label: "Lancement et accueil", status: "Jalon" },
] as const;

export const team = [
  { name: "Prof. Abderrahman EL HISSE", primary: "Responsable du projet", secondary: "Arbitrage et validation" },
  { name: "M. BOUMRAH", primary: "Mainteneur", secondary: "Relecteur" },
  { name: "M. KARIM", primary: "Relecteur", secondary: "Contributeur" },
  { name: "M. Abdelmajed", primary: "Contributeur", secondary: "Testeur débutant" },
  { name: "M. YOUSSEF", primary: "Contributeur", secondary: "Relecteur" },
] as const;

export const qualityCriteria = [
  { name: "Utilité", detail: "Besoin réel, public identifié, résultat exploitable." },
  { name: "Méthode", detail: "Étapes, outils, prompts et rôle humain documentés." },
  { name: "Vérification", detail: "Faits contrôlés, liens testés, limites signalées." },
  { name: "Traçabilité", detail: "Sources, droits, preuves et décisions accessibles." },
  { name: "Réutilisation", detail: "Fichiers disponibles et conditions précisées." },
] as const;

export const contributionLevels = [
  { level: "Découverte", action: "Proposer une idée, commenter ou suivre." },
  { level: "Contribution guidée", action: "Compléter une fiche officielle." },
  { level: "Contribution GitHub", action: "Créer une branche, des commits et une Pull Request." },
  { level: "Relecture", action: "Contrôler utilité, sources, droits et limites." },
  { level: "Maintenance", action: "Qualifier, organiser, arbitrer et publier." },
] as const;

export const projectStatuses: ProjectStatus[] = [
  "Idée proposée",
  "À clarifier",
  "Prête à produire",
  "En production",
  "En revue",
  "Corrections demandées",
  "Validée",
  "Publiée",
];

