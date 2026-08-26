# Guide de gestion du contenu

## Ajouter une production

Ajoutez un objet dans public/data/projects.json.

Champs minimaux :

- id au format PXXX
- slug unique en minuscules
- titre et résumé public
- catégorie
- besoin réel
- public bénéficiaire
- résultat attendu
- statut officiel
- difficulté
- contributeur et relecteur
- progression de 0 à 100
- verified à false avant validation

## Contrôles avant validation

- besoin réel formulé
- public identifié
- résultat exploitable
- méthode documentée
- rôle humain explicite
- faits et liens contrôlés
- sources citées
- droits vérifiés
- données sensibles retirées
- limites indiquées
- preuve de review disponible

## Publication

Ne passez pas directement de Idée proposée à Publiée.

Une review humaine favorable est nécessaire.

Deux reviews humaines favorables sont nécessaires pour un contenu lié à la santé, au droit, aux finances, à la sécurité, aux données personnelles ou à une décision à fort impact.

## Synchronisation des deux frontends

Le portail React utilise data/portal.ts.

Les cibles GitHub Pages et PHP utilisent public/data/projects.json.

Pendant la phase pilote les deux sources sont tenues ensemble. La prochaine évolution doit générer automatiquement data/portal.ts depuis le JSON ou faire charger le JSON au portail React.

## Validation

    npm run validate:content

Le contrôle refuse :

- identifiants et slugs invalides
- doublons
- statuts non officiels
- progression hors de 0 à 100
- incohérence entre verified et le statut
