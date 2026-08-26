# Architecture du portail

## Décision centrale

Le portail adopte une architecture static-first.

Les données validées sont stockées en JSON. Le frontend les présente. GitHub conserve les preuves officielles.

## Trois surfaces

### Portail Vite/Vinext

Le dossier principal utilise React, TypeScript et Vinext sur Vite.

Il fournit les routes éditoriales, le portfolio, les fiches de production et le tableau de bord.

Cette cible convient à un hébergement compatible Cloudflare Worker ou Sites.

### GitHub Pages

Le dossier targets/github-pages/ contient une application Vite statique.

Elle utilise des routes par fragment : #accueil, #projets, #production/slug, #dashboard, #methode et #participer.

Cette stratégie évite les erreurs 404 sur GitHub Pages.

### cPanel avec PHP

Le dossier php-api/ fournit trois endpoints GET :

- api/catalogue.php
- api/dashboard.php
- api/health.php

Le PHP lit les mêmes fichiers JSON. Il ne possède aucune fonction d’écriture.

## Flux des données

1. Un membre ouvre une Issue.
2. Le mainteneur qualifie la proposition.
3. Le contributeur crée la fiche et le livrable.
4. Une Pull Request porte la review.
5. La fusion dans main rend la contribution officielle.
6. Un snapshot JSON alimente le portail.
7. Le portail publie uniquement les données approuvées.

## Contrat d’une production

Le schéma schemas/production.schema.json impose :

- identifiant PXXX
- slug unique
- titre, catégorie et résumé
- besoin, public et résultat
- statut officiel
- difficulté
- état de vérification

Une production ne peut avoir verified à true que si son statut vaut Validée ou Publiée.

## Statuts officiels

1. Idée proposée
2. À clarifier
3. Prête à produire
4. En production
5. En revue
6. Corrections demandées
7. Validée
8. Publiée

## Sécurité

- aucun secret dans le frontend
- aucun jeton dans une variable VITE
- aucun téléversement dans la V1
- API PHP limitée à GET
- contrôle realpath avant lecture
- limite de 2 Mo par fichier JSON
- en-têtes de sécurité
- aucune donnée personnelle non autorisée

## Évolution recommandée

Une GitHub Action pourra produire dashboard.json et projects.json à partir des Issues et du Project.

Le workflow doit conserver le dernier snapshot valide si la synchronisation échoue.
