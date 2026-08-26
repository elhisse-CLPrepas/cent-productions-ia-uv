# Portail — 100 Productions IA utiles et vérifiées

Portail du projet collaboratif du Challenge 100 Jours — Atelier LN-IA.

> Un besoin réel → une méthode → une production → une vérification → un partage public.

Le pack fournit trois cibles à partir du même contenu :

1. un portail Vite/Vinext React et TypeScript
2. une version Vite statique pour GitHub Pages
3. une version Vite statique avec API PHP en lecture seule pour cPanel

## État pris en compte

Snapshot GitHub du 26 août 2026 :

- dépôt public elhisse-CLPrepas/cent-productions-ia-uv
- branche par défaut main
- 0 Issue
- 0 Pull Request
- 0 production validée
- GitHub Pages non activé
- Discussions non activées
- cinq propositions pilotes préparées dans le portail

Les propositions pilotes ne sont pas présentées comme des productions officielles.

## Routes du portail React

- / — accueil et état du dépôt
- /projet — vision, objectifs, catégories et calendrier
- /projets — portfolio filtrable
- /projets/[slug] — fiche détaillée
- /tableau-de-bord — progression, statuts, catégories et jalons
- /methode — workflow, qualité et validation humaine
- /contribuer — niveaux et formulaires GitHub
- /equipe — rôles et gouvernance

## Sources de contenu

- data/portal.ts — contenu utilisé par le portail React
- public/data/projects.json — catalogue administrable
- public/data/dashboard.json — snapshot des indicateurs
- public/config/portal.json — sélection de la source JSON ou PHP
- schemas/production.schema.json — contrat de données

## Commandes

Prérequis : Node.js 22.13 ou plus récent.

    npm ci
    npm run validate:content
    npm run build

Construire la cible GitHub Pages :

    npm run build:pages-target

Résultat : release/github-pages/

Construire la cible cPanel avec PHP :

    npm run build:php-target

Résultat : release/php-portal/

## Mise à jour du portfolio

1. Copier un objet existant dans public/data/projects.json.
2. Donner un identifiant unique au format PXXX.
3. Donner un slug unique en minuscules.
4. Choisir un des huit statuts officiels.
5. Laisser verified à false avant review humaine.
6. Lancer npm run validate:content.
7. Répercuter la fiche dans data/portal.ts pour le portail React.

Une automatisation GitHub Actions pourra plus tard produire le snapshot JSON. Aucun jeton GitHub ne doit être placé dans le frontend ou dans une variable VITE.

## Principe d’architecture

GitHub reste la source officielle pour les Issues, branches, Pull Requests, reviews et preuves.

Le PHP reste facultatif. Il sert uniquement les données validées. Il ne publie rien dans GitHub et ne crée pas de système d’administration parallèle.

## Documentation

- 00-LIRE-EN-PREMIER.md
- docs/ARCHITECTURE-PORTAIL.md
- docs/GUIDE-CONTENU.md
- docs/DEPLOIEMENT.md
- docs/RAPPORT-QUALITE.md

## Licences

- code : MIT
- contenus pédagogiques : CC BY-SA 4.0 avec attribution à LN-IA

L’IA assiste. Le membre produit. Le collectif relit. L’humain valide.


python -m http.server 4173 --directory release/github-pages


http://localhost:4173/

http://localhost:4173/#accueil

http://localhost:4173/#accueil
http://localhost:4173/#projets
http://localhost:4173/#dashboard
http://localhost:4173/#methode
http://localhost:4173/#participer
