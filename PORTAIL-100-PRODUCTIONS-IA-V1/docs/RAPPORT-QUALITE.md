# Rapport de contrôle qualité

## Périmètre

Portail « 100 Productions IA utiles et vérifiées ».

Sources contrôlées :

- document ANNONCE-GITHUB-100-PRODUCTIONS-IA.docx
- dépôt elhisse-CLPrepas/cent-productions-ia-uv
- README, cadrage V2, décisions V2, gouvernance et modèles

Date du snapshot : 26 août 2026.

## Fidélité du contenu

- titre officiel repris
- responsable repris
- lancement du 25 septembre 2026 repris
- cinq catégories pilotes reprises
- huit étapes du workflow reprises
- équipe pilote reprise
- règle d’une review humaine reprise
- règle de deux avis pour le sensible reprise

## Vérité des indicateurs

Le dépôt comptait au moment du contrôle :

- 0 Issue
- 0 Pull Request
- 0 production PXXX
- GitHub Pages désactivé
- Discussions désactivées

Le portail affiche ces valeurs comme un snapshot.

Les cinq cartes sont marquées comme propositions pilotes non validées.

## Contrôles techniques prévus

- validation JSON
- build Vite/Vinext
- build GitHub Pages
- build PHP
- test de syntaxe PHP
- test de chargement des données
- test des routes principales
- contrôle du titre HTML

## Résultats du contrôle du pack

- validation JSON : réussie
- build Vite/Vinext : réussi
- build GitHub Pages : réussi
- assemblage de la cible PHP : réussi
- tests automatisés : 5 réussis sur 5
- test syntaxique PHP : non exécuté car l’interpréteur PHP n’est pas installé dans l’environnement de production du pack

Les fichiers PHP utilisent PHP 8 et restent limités à des requêtes GET en lecture seule.

## Accessibilité intégrée

- langue française déclarée
- lien d’évitement
- titres hiérarchisés
- contrastes forts
- focus visible
- navigation clavier
- réduction des animations
- tableaux HTML pour les données comparables
- libellés accessibles pour la recherche et les filtres

## Décisions humaines restantes

- validation éditoriale des cinq propositions
- affectation des contributeurs et relecteurs
- configuration effective du GitHub Project
- activation éventuelle de Pages et Discussions
- choix de la cible publique
- autorisation de publication
