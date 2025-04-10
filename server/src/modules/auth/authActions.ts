import type { RequestHandler } from "express";

import argon2 from "argon2";

import jwt from "jsonwebtoken";
import userRepository from "../user/userRepository";

//gestion de la connection des utilisteurs
const login: RequestHandler = async (req, res, next) => {
  try {
    const logUser = {
      email: req.body.email,
      password: req.body.password,
    };
    // Récupère l'utilisateur par son email
    const user = await userRepository.ReadByEmail(logUser.email);

    if (user) {
      // Vérifie si le mot de passe est correct
      const verified = await argon2.verify(
        user.hashed_password,
        logUser.password,
      );

      if (verified) {
        // Crée un payload avec l'ID de l'utilisateur
        const myPlayload = {
          id: user.id,
          isAdmin: user.is_admin,
        };
        // Génère un token JWT
        const token = jwt.sign(myPlayload, process.env.APP_SECRET as string, {
          expiresIn: "1h",
        });
        // Envoie un cookie avec le token
        res.cookie("authToken", token, {
          sameSite: "strict",
          maxAge: 1000 * 60 * 60,
        });
        // Renvoie l'ID et le statut de l'utilisateur en réponse
        res.status(200).json({
          id: user.id,
          isAdmin: user.is_admin,
          message: "Connexion réussie !",
        });
      } else {
        //Si la vérification échoue renvoie un statut 403
        res.status(403).json({ message: "Email et/ou mot de passe incorrect" });
      }
    } else {
      // Si l'utilisateur n'est pas trouvé renvoie un statut 404
      res.status(404).json({ message: "Email et/ou mot de passe incorrect" });
    }
  } catch (err) {
    next(err);
  }
};
// vérifier le cookie d'authentification
const checkAuthCookie: RequestHandler = (req, res, next) => {
  const { authToken } = req.cookies;

  try {
    if (authToken) {
      // Vérifie le token JWT
      const verified = jwt.verify(authToken, process.env.APP_SECRET as string);

      if (verified) {
        // Si le token est vérifié renvoie un statut 200
        res.status(200);
      } else {
        // Sinon efface le cookie
        res
          .clearCookie("authToken")
          .json({ message: "Vous avez été déconnecté !" });
      }
      next();
    } else {
      // Si le token n'existe pas renvoie un statut 401
      res
        .status(401)
        .json({ message: "Vous n'êtes pas autorisé à faire ça !" });
    }
  } catch (err) {
    next(err);
  }
};

const logout: RequestHandler = (req, res, next) => {
  const { authToken } = req.cookies;

  if (authToken) {
    res.clearCookie("authToken").sendStatus(200);
  }
};

const decodeToken: RequestHandler = async (req, res, next) => {
  const { authToken } = req.cookies;

  try {
    // Décode le token JWT et renvoie le contenu
    const decoded = jwt.decode(authToken);
    res.json(decoded);
    req.body.decoded = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

export default { login, checkAuthCookie, logout, decodeToken };
