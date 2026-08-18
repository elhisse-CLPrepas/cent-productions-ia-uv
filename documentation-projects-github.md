# À propos de Projects

Projects est un outil adaptable et flexible permettant de planifier et de suivre le travail sur GitHub.

## À propos de Projects

Un projet est un tableau, un tableau de bord et une feuille de route adaptables qui s’intègrent à vos problèmes et demandes de tirage sur GitHub afin de vous aider à planifier et à suivre efficacement votre travail au niveau d’un utilisateur ou d’une organisation. Vous pouvez créer et personnaliser plusieurs vues en filtrant, triant, segmentant et regroupant vos problèmes et demandes de tirage afin de gérer les carnets de tâches et les feuilles de route de votre équipe, visualiser le travail au moyen de graphiques configurables, ajouter des champs personnalisés pour suivre les métadonnées propres à votre équipe, créer des modèles, partager des mises à jour d’état et automatiser vos projets. Plutôt que d’imposer une méthodologie précise, un projet fournit des fonctionnalités flexibles que vous pouvez adapter aux besoins et aux processus de votre équipe.

Pour commencer et créer un projet, consultez [Créer un projet](/en/issues/planning-and-tracking-with-projects/creating-projects/creating-a-project). Pour en savoir plus sur les différentes dispositions, consultez [Modifier la disposition d’une vue](/en/issues/planning-and-tracking-with-projects/customizing-views-in-your-project/changing-the-layout-of-a-view).

### Rester à jour

Vos projets sont constitués des problèmes et des demandes de tirage que vous y ajoutez, ce qui crée des références directes entre votre projet et votre travail. Les informations sont automatiquement synchronisées avec votre projet lorsque vous apportez des modifications, et vos vues et graphiques sont alors mis à jour. Cette intégration fonctionne dans les deux sens : lorsque vous modifiez dans votre projet les informations relatives à une demande de tirage ou à un problème, ces modifications se répercutent dans la demande de tirage ou le problème concerné. Par exemple, si vous changez une personne assignée dans votre projet, cette modification apparaît dans votre problème. Vous pouvez pousser cette intégration encore plus loin, regrouper votre projet par personne assignée et modifier l’attribution des problèmes en les faisant glisser d’un groupe à l’autre.

Pour en savoir plus sur la gestion des éléments de votre projet, consultez [Ajouter des éléments à votre projet](/en/issues/planning-and-tracking-with-projects/managing-items-in-your-project/adding-items-to-your-project) et [Modifier les éléments de votre projet](/en/issues/planning-and-tracking-with-projects/managing-items-in-your-project/editing-items-in-your-project).

### Afficher votre projet sous différents angles

Répondez rapidement à vos questions les plus urgentes en adaptant la vue de votre projet afin d’obtenir les informations dont vous avez besoin. Vous pouvez enregistrer ces vues pour y revenir rapidement lorsque nécessaire et les mettre à la disposition de votre équipe. Les vues permettent non seulement de limiter les éléments affichés, mais proposent également trois options de disposition différentes.

Vous pouvez afficher votre projet sous la forme d’un tableau à haute densité, d’un tableau Kanban ou d’une feuille de route chronologique. Ces vues personnalisées vous aident à gérer le carnet de tâches de votre équipe, à planifier les itérations, votre feuille de route ou la publication d’une fonctionnalité, ainsi qu’à trier les bogues, le tout à proximité immédiate du code. Pour en savoir plus sur les différentes options de disposition, consultez [Modifier la disposition d’une vue](/en/issues/planning-and-tracking-with-projects/customizing-views-in-your-project/changing-the-layout-of-a-view).

### Ajouter des métadonnées à vos éléments

Vous pouvez utiliser des champs personnalisés pour ajouter des métadonnées à vos problèmes, demandes de tirage et brouillons de problèmes, et ainsi obtenir une vue plus riche des attributs des éléments. Vous n’êtes pas limité aux métadonnées intégrées (personne assignée, jalon, étiquettes, etc.) qui existent actuellement pour les problèmes et les demandes de tirage. Vous pouvez, par exemple, ajouter les métadonnées suivantes sous forme de champs personnalisés :

* Un champ de date pour suivre les dates de livraison prévues.
* Un champ numérique pour suivre la complexité d’une tâche.
* Un champ à sélection unique pour indiquer si la priorité d’une tâche est faible, moyenne ou élevée.
* Un champ de texte pour ajouter une note rapide.
* Un champ d’itération pour planifier le travail semaine après semaine, avec notamment la prise en charge des interruptions.

Vous pouvez utiliser jusqu’à 50 champs dans un projet, métadonnées intégrées et champs personnalisés compris. Pour en savoir plus sur les différents champs que vous pouvez ajouter à un projet, consultez [Comprendre les champs](/en/issues/planning-and-tracking-with-projects/understanding-fields) et [Gérer les éléments de votre projet](/en/issues/planning-and-tracking-with-projects/managing-items-in-your-project).

### Automatiser vos projets

Vous pouvez automatiser votre projet de plusieurs façons. Les flux de travail intégrés permettent de définir automatiquement des champs lorsque des éléments sont ajoutés ou modifiés. Vous pouvez également configurer votre projet pour archiver automatiquement les éléments qui répondent à certains critères et ajouter automatiquement les éléments d’un dépôt qui correspondent aux critères définis. Pour en savoir plus, consultez [Utiliser les automatisations intégrées](/en/issues/planning-and-tracking-with-projects/automating-your-project/using-the-built-in-automations).

Vous pouvez également utiliser l’API GraphQL et GitHub Actions pour exercer un contrôle encore plus poussé sur votre projet. Pour en savoir plus, consultez [Utiliser l’API pour gérer Projects](/en/issues/planning-and-tracking-with-projects/automating-your-project/using-the-api-to-manage-projects) et [Automatiser Projects à l’aide d’Actions](/en/issues/planning-and-tracking-with-projects/automating-your-project/automating-projects-using-actions).

### Afficher des graphiques et des analyses

Les analyses de Projects vous permettent d’afficher, de créer et de personnaliser des graphiques dont les données sources proviennent des éléments ajoutés à votre projet. Vous pouvez appliquer des filtres au graphique par défaut et créer vos propres graphiques. Lorsque vous créez un graphique, vous définissez les filtres, le type de graphique et les informations affichées. Le graphique est ensuite accessible à toute personne autorisée à consulter le projet.

Pour en savoir plus, consultez [À propos des analyses de Projects](/en/issues/planning-and-tracking-with-projects/viewing-insights-from-your-project/about-insights-for-projects).

### Créer des modèles de projet

Vous pouvez créer des modèles de projet pour votre organisation ou définir un projet comme modèle afin de partager un projet préconfiguré avec d’autres membres de votre organisation, qui pourront ensuite l’utiliser comme base pour leurs propres projets. Les modèles de projet comprennent les vues, les champs personnalisés, les brouillons de problèmes et les champs associés, les flux de travail configurés (à l’exception des flux de travail d’ajout automatique) ainsi que les analyses.

Pour en savoir plus, consultez [Gérer les modèles de projet dans votre organisation](/en/issues/planning-and-tracking-with-projects/managing-your-project/managing-project-templates-in-your-organization).

### Partager des mises à jour d’état

Vous pouvez tenir votre équipe informée et partager des aperçus généraux qui permettront à chacun de déterminer l’état de votre projet. Vous pouvez définir un état, tel que « En bonne voie » ou « À risque », afin de permettre aux personnes de connaître rapidement la situation actuelle du projet. Vous pouvez également définir des dates de début et des dates cibles. Votre mise à jour d’état peut aussi contenir un message mis en forme avec Markdown. Les mises à jour d’état figurent dans le panneau latéral de votre projet, sous la description et le fichier README, ainsi que dans l’en-tête du projet et dans les listes lorsque vous parcourez les projets.

Pour en savoir plus, consultez [Partager les mises à jour du projet](/en/issues/planning-and-tracking-with-projects/sharing-project-updates).

## Étapes suivantes

Voici quelques ressources utiles pour poursuivre votre découverte de Projects :

* Pour apprendre à commencer à utiliser les projets, consultez [Démarrage rapide pour Projects](/en/issues/planning-and-tracking-with-projects/learning-about-projects/quickstart-for-projects).
* Pour découvrir des conseils sur la gestion de vos projets, consultez [Bonnes pratiques pour Projects](/en/issues/planning-and-tracking-with-projects/learning-about-projects/best-practices-for-projects).
