import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Définissez vos routes API ici
/* ************************************************************************* */

import multer from "multer";
const upload = multer({ dest: "public/assets/images/" });
// Définir les routes liées aux items
import authActions from "./modules/auth/authActions";
import userActions from "./modules/user/userActions";
import videogameActions from "./modules/videogame/videogameActions";

// routes pour les videogames

router.get("/api/videogames", videogameActions.browse);
router.post("/api/videogames", upload.single("img"), videogameActions.add);
router.get(
  "/api/videogames/get-favs/:id",
  authActions.checkAuthCookie,
  videogameActions.getFavorites,
);
router.post(
  "/api/videogames/add-favs",
  authActions.checkAuthCookie,
  videogameActions.addFavorite,
);
router.delete(
  "/api/videogames/delete-fav/:id",
  authActions.checkAuthCookie,
  videogameActions.deleteFavoriteGame,
);
router.delete("/api/videogames/:id", videogameActions.destroy);

// routes pour les users

router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.put(
  "/api/users/:id",
  upload.single("img_profile"),
  userActions.addImageProfile,
);
router.post(
  "/api/users",
  userActions.checkPassword,
  userActions.hashPassword,
  userActions.add,
);
router.put(
  "/api/users",
  userActions.checkPassword,
  userActions.hashPassword,
  userActions.update,
);

// routes pour l'authentification

router.post("/api/users/login", authActions.login);
router.get(
  "/api/auth/check",
  authActions.checkAuthCookie,
  authActions.decodeToken,
);
router.get("/api/auth/logout", authActions.logout);

/* ************************************************************************* */

export default router;
