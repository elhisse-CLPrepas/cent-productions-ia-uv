# Le livre des cent ateliers LN IA

Lecteur du guide de Prof. Abderrahman EL HISSE : 100 ateliers, recherche par besoin, navigation par catégorie, prompts personnalisables et PDF de 225 pages.

## Adresse de partage prévue

https://elhisse-clprepas.github.io/cent-productions-ia-uv/

Cette adresse sera disponible après activation de GitHub Pages et réussite du déploiement. Le lecteur occupe la racine du site de ce dépôt. Le portail V1 reste un chantier distinct.

Chaque atelier possède une adresse directe, par exemple :

https://elhisse-clprepas.github.io/cent-productions-ia-uv/#atelier/G041

Le bouton « Copier le lien » permet de partager une fiche. Les informations saisies dans les prompts ne sont pas incluses dans ce lien.

## Démarrer localement

Depuis ce dossier, avec Node.js 24 et npm :

    npm ci
    npm run dev

Ouvrir l’adresse locale affichée. La couverture et le PDF sont déjà présents dans public ; Python et le Word original ne sont pas nécessaires pour construire ou déployer le lecteur.

## Vérifier la version GitHub Pages

    npm test
    npm run build:pages
    npm run check:pages
    npm run preview:pages

Ouvrir http://localhost:4173/cent-productions-ia-uv/ si le port 4173 est disponible. Le chemin public est centralisé dans site.config.js. Les adresses des ateliers utilisent un fragment # : leur ouverture directe ne demande aucune réécriture côté serveur.

La commande npm run build conserve aussi une construction portable avec des chemins relatifs. Le dossier dist est généré et ne doit pas être ajouté au commit.

## Préparer le premier déploiement

1. Envoyer la branche de préparation et ouvrir une PR après validation du commit local.
2. Vérifier les contrôles GitHub Actions et relire le résultat. En mode solo, l’auteur peut fusionner sa propre PR sans approbation externe.
3. Pages est configuré sur GitHub Actions, avec HTTPS ; conserver ce réglage dans Settings → Pages.
4. Vérifier que l’environnement github-pages autorise les déploiements depuis main.
5. Fusionner la PR. Le workflow « Livre LN IA · GitHub Pages » teste, construit et publie le livre.
6. Après réussite, ouvrir la page d’accueil, une adresse d’atelier et le PDF sur l’adresse publique.

Une PR exécute les tests et la construction sans publication. Le déploiement ne s’exécute que depuis main, après réussite des contrôles. Le déclenchement manuel depuis main permet de relancer la publication une fois Pages configuré. Aucun jeton personnel n’est nécessaire : le workflow utilise GITHUB_TOKEN avec les permissions adaptées à chaque job.

Le workflow publie uniquement dist : HTML, JavaScript, CSS, couverture et PDF. Les documents internes, scripts de génération et sources Word ne font pas partie des fichiers servis.

## Mises à jour en solo

Modifier le lecteur sur une branche, créer un commit et ouvrir une PR. Après réussite des contrôles, l’auteur mainteneur peut fusionner. Le workflow déploie automatiquement depuis `main`. La revue par un autre compte est facultative.

Les consignes pédagogiques du livre décrivent aussi un travail collectif. Pour les droits et la publication de ce dépôt, les [règles actuelles](../gouvernance/REGLES-VALIDATION.md) font référence.

## Contenu et confidentialité des saisies

Les 600 blocs d’instructions et les 456 champs à personnaliser sont conservés. Les réponses saisies restent en mémoire pendant la session ; recharger ou fermer la page les efface. Copier ou télécharger le prompt pour les conserver. Le lecteur ne transmet pas les champs à une API et n’exécute pas les prompts.

Le catalogue décrit des réalisations à entreprendre. Il ne déclare aucune production validée par le collectif.

## Sources et reconstruction du livre

- src/book.json : catalogue structuré et prompts.
- src/page-map.json : correspondances de pages et empreinte du PDF.
- public/guide-ln-ia.pdf : édition publiée du livre.
- public/couverture.png : couverture fournie par l’auteur.
- scripts/extract-book.py, build-pdf.py, verify-pdf.py et package-book.py : outils éditoriaux locaux.

Ces outils Python demandent l’arborescence de travail d’origine, les fichiers sources et, pour le PDF, les polices Windows Calibri et Georgia ainsi que reportlab. La vérification PDF utilise PyMuPDF et Pillow. Les polices ne sont pas redistribuées. Les exports autonomes sont produits sous output à la racine du dépôt ; ils ne sont pas requis pour GitHub Pages.

## Références techniques

- [Déploiement statique avec Vite](https://vite.dev/guide/static-deploy.html#github-pages)
- [Workflows GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

Code : MIT. Contenus pédagogiques : CC BY-SA 4.0 avec attribution LN IA, conformément aux licences du dépôt et sous réserve des droits des ressources tierces.
