# Règles de validation

## Mode solo — décision du 28 septembre 2026

Le responsable du dépôt autorise la validation et la fusion de ses propres contributions. Ce mode remplace l’obligation antérieure d’une ou de deux approbations externes. GitHub ne demande plus de review provenant d’un autre compte.

1. L’auteur contrôle le résultat et assume la décision de publication.
2. La PR conserve le besoin, le résultat, les contrôles et les limites ; une Issue est facultative pour une correction technique ou documentaire.
3. Les contrôles automatiques disponibles doivent réussir et les erreurs bloquantes connues être corrigées avant fusion.
4. Les sources, droits, liens, preuves et données non autorisées sont contrôlés.
5. L’auteur, qui est mainteneur, peut fusionner sa PR. Une auto-approbation GitHub n’est pas nécessaire.
6. Le workflow du livre publie depuis `main` après réussite des tests et de la construction.
7. La disponibilité du site et du PDF est vérifiée après déploiement.

## Nature de la validation

- **Autocontrôle de l’auteur** : contrôles effectués par la personne qui a produit le contenu.
- **Revue indépendante** : avis d’une autre personne, uniquement lorsqu’il existe effectivement.
- Les suggestions et les tests réalisés avec une IA sont des aides au contrôle ; ils ne constituent pas une revue humaine indépendante.

Pour les sujets sensibles ou à fort impact, notamment santé, droit, finances, sécurité et données personnelles, documenter les limites et solliciter une expertise adaptée dès que possible. L’absence d’un tel avis doit rester explicite.

## Avis possibles

- **À corriger** : une erreur ou une information obligatoire manque.
- **Validable** : le résultat attend la décision de l’auteur.
- **Validé par l’auteur** : l’auteur accepte la publication après ses contrôles.
- **Relu indépendamment** : une autre personne a effectivement réalisé la revue, avec une trace de son avis.

La protection contre les push forcés et la suppression de `main` reste active. Le mode collectif et son obligation de revue pourront être rétablis par une décision ultérieure du responsable.
