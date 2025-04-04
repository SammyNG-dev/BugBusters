import client from "./client";

// Essayer d'obtenir une connexion à la base de données
client
  .getConnection()
  .then((connection) => {
    console.info(`Utilisation de la base de données ${process.env.DB_NAME}`);

    connection.release();
  })
  .catch((error: Error) => {
    console.warn(
      "Avertissement :",
      "Échec de l'établissement de la connexion à la base de données.",
      "Veuillez vérifier vos identifiants de base de données dans le fichier .env si vous avez besoin d'un accès à la base de données.",
    );
    console.warn(error.message);
  });
