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

## Fonctionnement actuel en solo

Le responsable possède les droits d’écriture et peut fusionner sa propre PR. Depuis le 28 septembre 2026, aucune approbation par un autre compte n’est exigée.

**Parcours : branche → commit → PR → contrôles réussis → fusion par l’auteur → déploiement.**

Les tests et la construction du livre précèdent chaque déploiement. Les push forcés et la suppression de `main` restent interdits. Consulter le [guide de contribution](CONTRIBUTING.md) pour les étapes.

## Principes de qualité

Une production est considérée comme utile et vérifiée lorsqu’elle respecte les principes suivants :

- le besoin réel et le public bénéficiaire sont clairement identifiés ;
- la méthode, les outils et les prompts sont documentés ;
- le rôle de l’humain et celui de l’IA sont explicités ;
- les faits, les liens, les sources et les droits sont contrôlés ;
- les limites et les risques sont signalés ;
- aucune donnée personnelle, confidentielle ou non autorisée n’est publiée ;
- la décision de l’auteur et les contrôles effectués sont documentés avant la fusion ;
- l’autocontrôle et une éventuelle revue indépendante sont distingués ; les limites de validation sont indiquées pour les contenus sensibles.

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
Contrôles, corrections et validation par l’auteur
        ↓
Fusion dans main
        ↓
Publication avec GitHub Pages
```

Une production PXXX utilise une Issue et le modèle officiel. Une correction technique ou documentaire peut être suivie directement dans sa PR. L’auteur dispose des droits d’écriture sur `main` ; le parcours par PR reste recommandé pour la traçabilité.

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

Le [guide de contribution](CONTRIBUTING.md), les modèles d’Issues et le modèle de Pull Request sont disponibles. Le fonctionnement actuel est adapté à un auteur seul.

Pour une nouvelle production PXXX :

1. ouvrir ou choisir une Issue ;
2. le responsable qualifie et affecte la production, y compris à lui-même ;
3. créer une branche `contribution/PXXX-titre-court` ;
4. compléter la fiche officielle et ajouter les preuves ;
5. ouvrir une Pull Request liée à l’Issue ;
6. vérifier les contrôles et traiter les corrections ;
7. l’auteur mainteneur valide et fusionne la PR.

## Licences

Les décisions de cadrage adoptent :

- la **licence MIT** pour le code ;
- la **licence Creative Commons Attribution — Partage dans les mêmes conditions 4.0 International (`CC BY-SA 4.0`)** pour les contenus pédagogiques, avec attribution à LN-IA.

Les fichiers de licence correspondants seront ajoutés pendant la construction du dépôt pilote.

## Gouvernance et validation

L’IA peut assister la rédaction, l’analyse et certains contrôles, mais elle ne peut pas déclarer seule une production « vérifiée ».

En mode solo, le responsable produit, contrôle et fusionne. La revue du collectif est ajoutée lorsqu’un relecteur est disponible. Les [règles de validation](gouvernance/REGLES-VALIDATION.md) précisent ce fonctionnement. Seules les contributions fusionnées dans `main` sont officielles.

---

**L’IA assiste. Le membre produit. Le collectif relit. L’humain valide. GitHub conserve les preuves. Le public bénéficie du résultat.**
