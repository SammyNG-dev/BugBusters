// Charger le module express pour créer une application web

import express from "express";

const app = express();

// Configuration

/* ************************************************************************* */

// Gestion de CORS : Pourquoi ce code est-il présent et dois-je définir des origines spécifiques autorisées pour mon projet ?

// CORS (Cross-Origin Resource Sharing) est un mécanisme de sécurité dans les navigateurs web qui bloque les requêtes provenant d'un domaine différent de celui du serveur.
// Vous pouvez trouver la ligne magique suivante dans les forums :

// app.use(cors());

// Vous ne devriez PAS faire cela : un tel code utilise le module `cors` pour autoriser toutes les origines, ce qui peut poser des problèmes de sécurité.
// Pour ce modèle pédagogique, le code CORS permet CLIENT_URL en mode développement (lorsque process.env.CLIENT_URL est défini).

import cors from "cors";

if (process.env.CLIENT_URL != null) {
  app.use(cors({ origin: [process.env.CLIENT_URL], credentials: true }));
}

// Si vous avez besoin d'autoriser des origines supplémentaires, vous pouvez ajouter quelque chose comme ceci :

/*
app.use(
  cors({
    origin: ["http://mysite.com", "http://another-domain.com"],
  }),
);
*/

// Avec ["http://mysite.com", "http://another-domain.com"]
// à remplacer par un tableau de vos origines de confiance

/* ************************************************************************* */

// Analyse des requêtes : Comprendre le but de cette partie

// L'analyse des requêtes est nécessaire pour extraire les données envoyées par le client dans une requête HTTP.
// Par exemple, pour accéder au corps d'une requête POST.
// Le code actuel contient différentes options d'analyse en commentaires pour démontrer différentes manières d'extraire des données.

// 1. `express.json()`: Analyse les requêtes avec des données JSON.
// 2. `express.urlencoded()`: Analyse les requêtes avec des données URL-encodées.
// 3. `express.text()`: Analyse les requêtes avec des données textuelles brutes.
// 4. `express.raw()`: Analyse les requêtes avec des données binaires brutes.

// Décommentez une ou plusieurs de ces options en fonction du format des données envoyées par votre client :

app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.text());
// app.use(express.raw());

/* ************************************************************************* */

// importation du cookie-parser
import cookieParser from "cookie-parser";

app.use(cookieParser());

/* ************************************************************************* */

// Importer le routeur de l'API
import router from "./router";

// Monter le routeur de l'API sous le point de terminaison "/api"

app.use(router);

/* ************************************************************************* */

// Configuration prête pour la production : À quoi ça sert ?

// Le code inclut des sections pour configurer un environnement de production où le client et le serveur sont exécutés depuis le même processus.

// À quoi ça sert :
// - Servir les fichiers statiques du client depuis le serveur, ce qui est utile lors de la création d'une application à page unique avec React.
// - Rediriger les requêtes non gérées (par exemple, toutes les requêtes ne correspondant pas à une route API définie) vers le fichier index.html du client. Cela permet au client de gérer le routage côté client.

import fs from "node:fs";
import path from "node:path";

// Servir les ressources du serveur

const publicFolderPath = path.join(__dirname, "../../server/public");

if (fs.existsSync(publicFolderPath)) {
  app.use(express.static(publicFolderPath));
}

// Servir les ressources du client

const clientBuildPath = path.join(__dirname, "../../client/dist");

if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));

  // Rediriger les requêtes non gérées vers le fichier index du client

  app.get("*", (_, res) => {
    res.sendFile("index.html", { root: clientBuildPath });
  });
}

/* ************************************************************************* */

// Middleware pour la journalisation des erreurs
// Important : Le middleware de gestion des erreurs doit être défini en dernier, après les autres appels app.use() et les routes.

import type { ErrorRequestHandler } from "express";

// Définir une fonction middleware pour journaliser les erreurs
const logErrors: ErrorRequestHandler = (err, req, res, next) => {
  // Journaliser l'erreur dans la console à des fins de débogage
  console.error(err);
  console.error("sur req :", req.method, req.path);

  // Transmettre l'erreur au middleware suivant dans la pile
  next(err);
};

// Monter le middleware logErrors globalement
app.use(logErrors);

/* ************************************************************************* */

export default app;
