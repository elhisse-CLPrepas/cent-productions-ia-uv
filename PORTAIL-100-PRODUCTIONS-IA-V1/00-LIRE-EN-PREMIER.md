# Lire en premier

Ce pack est une fondation complète pour le portail « 100 Productions IA utiles et vérifiées ».

## Ce qui est prêt

- portail React responsive avec plusieurs pages
- portfolio filtrable et fiches détaillées
- tableau de bord fondé sur un snapshot daté
- workflow en huit étapes
- pages de qualité, participation et gouvernance
- contenu administrable par JSON
- cible Vite pour GitHub Pages
- cible Vite + PHP en lecture seule pour cPanel
- validation automatique du contenu
- documentation d’architecture et de déploiement

## Ce qui reste une décision humaine

1. Valider les cinq titres de productions pilotes.
2. Transformer chaque proposition retenue en Issue GitHub.
3. Confirmer les contributeurs et relecteurs affectés.
4. Créer ou vérifier le GitHub Project prévu.
5. Activer GitHub Pages lorsque la version sera validée.
6. Activer Discussions si la communauté doit les utiliser.
7. Choisir la cible publique : GitHub Pages, cPanel PHP ou les deux.

## Règle de vérité

Les chiffres du tableau de bord proviennent du snapshot GitHub du 26 août 2026.

Les cinq cartes du portfolio sont des propositions éditoriales. Elles ne comptent pas comme productions validées.

## Première exécution

    npm ci
    npm run validate:content
    npm run build
    npm run build:pages-target
    npm run build:php-target

Ne publiez pas avant validation humaine du contenu, des liens et de la cible d’hébergement.
