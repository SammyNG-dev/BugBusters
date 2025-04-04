import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  is_admin: boolean;
  hashed_password: string;
};

type UpdateUser = {
  id: number;
  email: string;
  hashed_password: string;
};

type NewImageProfile = {
  id: number;
  img_profile: string;
};

class userRepository {
  // Les R de CRUD - Opérations de lecture

  async read(id: number) {
    // Exécuter la requête SQL SELECT pour récupérer un élément spécifique par son ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where id = ?",
      [id],
    );

    // Retourner la première ligne du résultat, qui représente l'élément
    return rows[0] as User;
  }

  // Le C de CRUD - Opération de création

  async readAll() {
    // Exécuter la requête SQL SELECT pour récupérer tous les utilisateurs de la table "user"
    const [rows] = await databaseClient.query<Rows>("select * from user");

    // Retourner le tableau des éléments
    return rows as User[];
  }

  async create(addUser: Omit<User, "id" | "is_admin">) {
    const [result] = await databaseClient.query<Result>(
      "insert into user (firstname, lastname, email, hashed_password) values (?, ?, ?, ?)",
      [
        addUser.firstname,
        addUser.lastname,
        addUser.email,
        addUser.hashed_password,
      ],
    );
    // Retourner l'utilisateur nouvellement créé avec l'ID généré
    return result.insertId;
  }

  async ReadByEmail(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where email = ?",
      [email],
    );
    return rows[0] as User;
  }

  async edit(updateUser: UpdateUser) {
    const [result] = await databaseClient.query<Result>(
      "update user set email = ?, hashed_password = ? where id = ?",
      [updateUser.email, updateUser.hashed_password, updateUser.id],
    );

    return result.affectedRows;
  }

  async createImageProfile(imageProfile: NewImageProfile) {
    const [result] = await databaseClient.query<Result>(
      "update user set img_profile = ? where id= ?",
      [imageProfile.img_profile, imageProfile.id],
    );

    return result.affectedRows;
  }
}

export default new userRepository();
