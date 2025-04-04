import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Videogame = {
  id: number;
  title: string;
  img: string;
  gender: string;
  editor: string;
  descrip: string;
};

type Favorite = {
  gameId: number;
  userId: number;
};

class VideogameRepository {
  // Le C de CRUD - Opération de création

  async readAll() {
    // Exécuter la requête SQL SELECT pour récupérer tous les jeux de la table "videogame"
    const [rows] = await databaseClient.query<Rows>("select * from videogame");

    // Retourner le tableau des éléments
    return rows as Videogame[];
  }

  async create(addGame: Omit<Videogame, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into videogame (title, img, gender, editor, descrip ) values (?, ?, ?, ?, ?)",
      [
        addGame.title,
        addGame.img,
        addGame.gender,
        addGame.editor,
        addGame.descrip,
      ],
    );

    return result.insertId;
  }

  async readFavs(userId: number) {
    const [rows] = await databaseClient.query(
      "select videogame.id, title, img, gender, editor, descrip from videogame join user_favorite_game on user_favorite_game.videogame_id = videogame.id join user on user_favorite_game.user_id = user.id where user_id = ?",
      [userId],
    );

    return rows as Videogame[];
  }

  async createFavoriteGame(newFav: Favorite) {
    const [result] = await databaseClient.query<Result>(
      "insert into user_favorite_game (videogame_id, user_id) values (?, ?)",
      [newFav.gameId, newFav.userId],
    );

    return result.affectedRows;
  }

  async destroyFavoriteGame(gameId: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from user_favorite_game where videogame_id = ?",
      [gameId],
    );
    return result;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from videogame where id = ?",
      [id],
    );
    return result;
  }
}

export default new VideogameRepository();
