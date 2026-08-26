# Module PHP optionnel

Ce module sert le même catalogue JSON que la version GitHub Pages.

Il est volontairement limité à la lecture :

- `api/catalogue.php` fournit les productions
- `api/dashboard.php` fournit les indicateurs
- `api/health.php` confirme la disponibilité du service

Il ne contient ni compte administrateur, ni téléversement, ni jeton GitHub.

## Déploiement cPanel

1. Construire la cible PHP avec `npm run build:php-target`.
2. Copier le contenu de `release/php-portal/` dans le dossier public choisi.
3. Vérifier que PHP 8.0 ou plus récent est activé.
4. Ouvrir `api/health.php` puis `api/catalogue.php`.
5. Conserver les fichiers JSON comme source éditable versionnée.

Le module doit rester sur le même domaine que le portail. Aucun en-tête CORS permissif n’est envoyé.

