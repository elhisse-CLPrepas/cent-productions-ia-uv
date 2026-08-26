# Guide de déploiement

## Choix de la cible

| Cible | Usage | PHP | Routage |
|---|---|---:|---|
| Vite/Vinext | Hébergement Worker ou Sites | Non requis | Routes propres |
| GitHub Pages | Portail public statique | Non | Routes par fragment |
| cPanel | Portail statique avec API JSON PHP | Oui | Routes par fragment |

## GitHub Pages

Construire :

    npm run validate:content
    npm run build:pages-target

Copier le contenu de release/github-pages/ dans le dossier publié par Pages.

Deux options :

- publier depuis /docs sur main
- publier avec une GitHub Action vers Pages

Le dépôt inspecté le 26 août 2026 n’a pas encore GitHub Pages activé.

## cPanel PHP

Construire :

    npm run validate:content
    npm run build:php-target

Copier le contenu de release/php-portal/ dans le dossier public choisi.

Vérifier :

1. api/health.php
2. api/catalogue.php
3. api/dashboard.php
4. l’accueil du portail
5. les filtres du portfolio
6. une fiche détaillée

## Vite/Vinext

Construire :

    npm run validate:content
    npm run build

Cette sortie attend un runtime Worker compatible avec le contrat Vinext.

## Décision de publication

La construction d’un fichier ne vaut pas autorisation de publier.

Avant publication :

- valider les cinq propositions
- vérifier les liens GitHub
- confirmer la cible
- vérifier la licence des contenus
- confirmer l’absence de données sensibles
- obtenir la validation du responsable
