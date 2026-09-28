# Contribuer au projet

## Fonctionnement actuel : auteur seul

Depuis le 28 septembre 2026, le responsable du dépôt peut produire, contrôler et fusionner ses propres contributions. Aucune approbation par un autre compte GitHub n’est obligatoire. L’auteur possède déjà les droits d’écriture et d’administration ; cette décision n’accorde aucun accès supplémentaire au public.

## Parcours simple

1. Préparer une modification sur une branche et conserver un commit clair.
2. Ouvrir une Pull Request avec le besoin, le résultat et les contrôles effectués.
3. Corriger les erreurs et vérifier la réussite des contrôles automatiques disponibles.
4. L’auteur relit le résultat et décide de la fusion dans `main`.
5. Pour le livre Vite, le workflow publie automatiquement sur GitHub Pages. Vérifier ensuite le site et le PDF.

Une Issue reste utile pour une production PXXX ou un travail à suivre dans GitHub Projects. Elle est facultative pour une correction technique ou documentaire autonome. Le responsable peut qualifier et s’attribuer lui-même une production.

## Contenu et preuves

- Pour une nouvelle production, utiliser le [modèle de fiche](modeles/MODELE-FICHE-PRODUCTION.md) et la [checklist](modeles/CHECKLIST-CONTRIBUTEUR.md).
- Décrire le besoin, le public, le rôle de l’IA, les limites et les preuves.
- Contrôler les faits, les liens et les droits des ressources ; exclure les secrets et les données non autorisées.
- Indiquer « autocontrôle de l’auteur » lorsque personne d’autre n’a relu. Une IA ne constitue pas une validation humaine indépendante.
- Pour un contenu sensible ou à fort impact, solliciter un avis compétent dès que possible et préciser les limites de validation.

## Règles Git

- Préférer branche → PR → contrôles → fusion pour conserver un historique lisible.
- Les droits de l’auteur permettent aussi une écriture directe dans `main` ; le parcours par PR reste recommandé.
- Les push forcés et la suppression de `main` restent interdits.
- Ne jamais ajouter de secret, de jeton ou de fichier `.env` au dépôt.
- Le déploiement du livre reste conditionné à la réussite des tests et de la construction dans le workflow.

Les [règles de validation](gouvernance/REGLES-VALIDATION.md) décrivent le mode solo actuel. La revue par un autre contributeur pourra être réactivée lorsque le collectif disposera de relecteurs.
