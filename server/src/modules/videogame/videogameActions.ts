import fs from "node:fs";
import type { RequestHandler } from "express";
import { validateMIMEType } from "validate-image-type";
import videogameRepository from "./videogameRepository";

// Lire tous les jeux (BROWSE)
const browse: RequestHandler = async (req, res, next) => {
  try {
    const games = await videogameRepository.readAll();
    res.json(games);
  } catch (err) {
    next(err);
  }
};

// Ajouter un jeu (ADD)
const add: RequestHandler = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
    } else {
      const validation = await validateMIMEType(req.file.path, {
        allowMimeTypes: ["image/jpeg", "image/png", "image/webp"],
      });

      if (!validation.ok) {
        fs.unlinkSync(req.file.path);
        res.status(400).json({ error: "Invalid image type" });
      } else {
        const newGameDatas = {
          title: req.body.title,
          img: req.file.filename,
          gender: req.body.gender,
          editor: req.body.editor,
          descrip: req.body.descrip,
        };

        const insertId = await videogameRepository.create(newGameDatas);
        res.status(201).json({ insertId });
      }
    }
  } catch (err) {
    next(err);
  }
};

const getFavorites: RequestHandler = async (req, res, next) => {
  try {
    const idUser = Number.parseInt(req.params.id);
    const favs = await videogameRepository.readFavs(idUser);
    res.status(200).json(favs);
  } catch (err) {
    next(err);
  }
};

const addFavorite: RequestHandler = async (req, res, next) => {
  try {
    const newFavorite = {
      gameId: req.body.gameId,
      userId: req.body.userId,
    };
    const affectedRows =
      await videogameRepository.createFavoriteGame(newFavorite);

    if (affectedRows !== 0) {
      res.status(201).json({ message: "Jeu ajouté aux favoris." });
    } else {
      res
        .status(403)
        .json({ message: "Une erreur est survenue lors de l'ajout du jeu" });
    }
  } catch (err) {
    next(err);
  }
};

const deleteFavoriteGame: RequestHandler = async (req, res, next) => {
  try {
    const gameId = Number.parseInt(req.params.id);
    const result = await videogameRepository.destroyFavoriteGame(gameId);

    if (result) {
      res.status(200).json({ message: "Jeu retiré des favoris !" });
    } else {
      res.status(403).json({ message: "Une erreur est survenue" });
    }
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  const gameToDeleteId = Number.parseInt(req.params.id);
  try {
    const result = await videogameRepository.delete(gameToDeleteId);
    if (result) {
      res.status(200).json({ message: "Le jeu a bien été supprimé" });
    } else {
      res.status(403).json({ message: "Un erreur est survenue" });
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  add,
  getFavorites,
  addFavorite,
  deleteFavoriteGame,
  destroy,
};
