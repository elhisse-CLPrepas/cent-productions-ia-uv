# 100 Productions IA utiles et vérifiées

Projet collaboratif du **Challenge 100 Jours — Atelier LN-IA**.

> Un besoin réel → une méthode → une production → une vérification → un partage public.

## Présentation

Ce projet vise à produire et publier collectivement **100 ressources consacrées à des usages utiles, responsables et vérifiés de l’intelligence artificielle**.

Chaque contribution doit répondre à un besoin réel, expliquer la méthode suivie, distinguer le rôle de l’IA de celui de l’humain, présenter les contrôles réalisés et fournir les sources ainsi que les preuves nécessaires.

Le projet permet aux participants d’apprendre GitHub par la pratique tout en constituant une ressource publique, pédagogique et réutilisable.

## État du projet

**Phase actuelle :** construction du dépôt pilote<br>
**Cadrage :** V2 validée le 18 août 2026<br>
**Date cible de lancement :** 25 septembre 2026<br>
**Responsable :** Prof. Abderrahman EL HISSE<br>
**Dépôt prévu :** `cent-productions-ia-uv`<br>
**Propriétaire GitHub :** [`elhisse-CLPrepas`](https://github.com/elhisse-CLPrepas)

Documents de référence :

- [Fiche de cadrage V2](FICHE-CADRAGE-V2-100-PRODUCTIONS-IA-UTILES-VERIFIEES-LN-IA.md)
- [Décisions de cadrage V2](DECISIONS-CADRAGE-V2.md)
- [Guide de suivi des décisions V2](guide-d%C3%A9cisions-cadrage-v2.docx)
- [Documentation GitHub Projects en français](documentation-projects-github.md)

## Livre interactif des cent ateliers

Le [lecteur Vite](livre-cent-ateliers-vite/README.md) propose 100 ateliers, des prompts personnalisables et un [guide PDF de 225 pages](livre-cent-ateliers-vite/public/guide-ln-ia.pdf).

**Adresse de partage prévue :** https://elhisse-clprepas.github.io/cent-productions-ia-uv/

La publication est préparée avec GitHub Actions. Cette adresse devient disponible après activation de Pages et réussite du premier déploiement depuis main. Le catalogue présente des projets à réaliser ; il ne représente pas cent productions déjà validées.

## Objectifs

- publier 100 productions IA utiles, vérifiées et réutilisables ;
- apprendre à utiliser Issues, branches, commits, Pull Requests et reviews ;
- documenter les workflows humain–IA de manière transparente ;
- développer les compétences des contributeurs et des relecteurs ;
- rendre les productions validées accessibles avec GitHub Pages.

## Catégories du pilote

Le pilote est limité aux cinq catégories validées suivantes :

1. Enseigner et apprendre
2. Organiser et gérer un projet
3. Communiquer et présenter
4. Produire des documents
5. Résoudre un problème numérique

Les cinq autres catégories prévues seront introduites progressivement après le pilote.

## Principes de qualité

Une production est considérée comme utile et vérifiée lorsqu’elle respecte les principes suivants :

- le besoin réel et le public bénéficiaire sont clairement identifiés ;
- la méthode, les outils et les prompts sont documentés ;
- le rôle de l’humain et celui de l’IA sont explicités ;
- les faits, les liens, les sources et les droits sont contrôlés ;
- les limites et les risques sont signalés ;
- aucune donnée personnelle, confidentielle ou non autorisée n’est publiée ;
- une review humaine favorable est enregistrée avant la fusion ;
- deux avis humains favorables sont exigés pour un contenu sensible ou à fort impact.

## Parcours d’une contribution

```text
Idée ou besoin réel
        ↓
Issue structurée et qualifiée
        ↓
Branche dédiée ou fork
        ↓
Fiche de production et livrable
        ↓
Pull Request
        ↓
Review humaine et corrections
        ↓
Fusion dans main
        ↓
Publication avec GitHub Pages
```

Une contribution doit commencer par une Issue et utiliser le modèle officiel. Aucun push direct dans `main` n’est autorisé.

## Structure cible

```text
cent-productions-ia-uv/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
├── contributions/
├── docs/
├── gouvernance/
├── modeles/
├── preuves/
├── scripts/
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
└── SECURITY.md
```

La convention de nommage des fiches est :

```text
PXXX-categorie-titre-court.md
```

Exemple : `P001-enseignement-generer-fiche-pedagogique.md`.

## Équipe pilote

| Membre | Rôle principal | Rôle secondaire |
|---|---|---|
| Prof. Abderrahman EL HISSE | Responsable du projet | Arbitrage et validation |
| M. BOUMRAH | Mainteneur | Relecteur |
| M. KARIM | Relecteur | Contributeur |
| M. Abdelmajed | Contributeur | Testeur débutant |
| M. YOUSSEF | Contributeur | Relecteur |

## Feuille de route

- **18–24 août 2026 :** cadrage et validation des décisions — terminé
- **25–31 août 2026 :** construction et configuration GitHub
- **1–10 septembre 2026 :** expérience pilote avec cinq contributions
- **11–20 septembre 2026 :** préparation du mini-site public
- **21–24 septembre 2026 :** simulation et validation finale
- **25 septembre 2026 :** lancement

## Contribuer

Le dépôt est en cours de construction. Le guide détaillé `CONTRIBUTING.md`, les modèles d’Issues et le modèle de Pull Request seront ajoutés avant l’ouverture du pilote.

Le futur parcours de contribution sera le suivant :

1. ouvrir ou choisir une Issue ;
2. attendre sa qualification et son affectation ;
3. créer une branche `contribution/PXXX-titre-court` ;
4. compléter la fiche officielle et ajouter les preuves ;
5. ouvrir une Pull Request liée à l’Issue ;
6. traiter les observations des relecteurs ;
7. attendre la validation et la fusion par un mainteneur.

## Licences

Les décisions de cadrage adoptent :

- la **licence MIT** pour le code ;
- la **licence Creative Commons Attribution — Partage dans les mêmes conditions 4.0 International (`CC BY-SA 4.0`)** pour les contenus pédagogiques, avec attribution à LN-IA.

Les fichiers de licence correspondants seront ajoutés pendant la construction du dépôt pilote.

## Gouvernance et validation

L’IA peut assister la rédaction, l’analyse et certains contrôles, mais elle ne peut pas déclarer seule une production « vérifiée ».

Le contributeur produit, le collectif relit, un mainteneur fusionne et le responsable du projet arbitre les décisions structurantes. Seules les contributions fusionnées dans `main` sont officielles.

---

**L’IA assiste. Le membre produit. Le collectif relit. L’humain valide. GitHub conserve les preuves. Le public bénéficie du résultat.**
