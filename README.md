# Wildy Gamy

# Description
Le projet "Wildy Gamy" a pour objectif de créer un site web permettant aux utilisateurs de tester l'un des jeux de la salle d'arcade "Wildy Gamy" dans un univers virtuel. Ce site vise à attirer de nouveaux clients en offrant une expérience interactive qui les incite à visiter le magasin physique.

# Objectif
1. Test de Jeu en Ligne : les utilisateurs peuvent tester un jeu de la salle d'arcade directement sur le site web. (seul Pac-Man est implanté).
2. Interface Intuitive : conception d'un site facile à naviguer avec un accès rapide au jeu.
3. Présentation des Jeux : détail des jeux disponibles à la salle d'arcade.

# Fonctionnalités
1. Offrir une expérience immersive et réaliste du jeu virtuel.
2. Créer un lien entre l'expérience en ligne et la visite en magasin.

# Installation
1. Clonez ce répertoire sur votre machine locale : `git clone https://github.com/VotreNom/nom-du-projet.git`
2. Installez les dépendances nécessaires : `npm install`
3. Exécutez la migration de la base de données : `npm run db:migrate`
4. Lancez le serveur local pour tester l'application : `npm run dev`

# les ajouts
1. Ajouter plusieurs jeux de salle d'arcade au site.
2. Récupérer le score des jeux de test pour les mettre dans le classement du site. 
3. Création d'un toast pour toutes les notifications.
4. Mettre des shadows sur le logo et le titre du footer.
5. Améliorer l'expérience utilisateur pour les liens du site.
6. Continue un maximun a ce focaliser sur l'accessibilité de l'utilisateur.
7. Édit pour l'user 
8. Suppression des jeux dans la page liste de jeux.
9. Mettre en place un Easter egg
10. Animation du pac-man pour le footer et le header (Desktop).




<!-- ### Commandes de Base

| Commande               | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| `npm install`          | Installe les dépendances pour le client et le serveur                       |
| `npm run db:migrate`   | Met à jour la base de données à partir d'un schéma défini                   |
| `npm run dev`          | Démarre les deux serveurs (client et serveur) dans un seul terminal         |
| `npm run check`        | Exécute les outils de validation (linting et formatage)                     |
| `npm run test`         | Exécute les tests unitaires et d'intégration                                | -->

### Structure des Dossiers

```plaintext
my-project/
│
├── server/
│   ├── app/
│   │   ├── modules/
│   │   │   ├── item/
│   │   │   │   ├── itemActions.ts
│   │   │   │   └── itemRepository.ts
│   │   │   └── ...
│   │   ├── app.ts
│   │   ├── main.ts
│   │   └── router.ts
│   ├── database/
│   │   ├── client.ts
│   │   └── schema.sql
│   ├── tests/
│   ├── .env
│   └── .env.sample
│
└── client/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── App.tsx
    ├── .env
    └── .env.sample
```


