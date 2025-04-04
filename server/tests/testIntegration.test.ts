import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import supertest from "supertest";
import databaseClient from "../database/client";
import app from "../src/app";

import { request } from "node:http";
import { response } from "express";

describe("Videogame API Endpoints", () => {
  test("GET /api/videogames doit retourner la liste des jeux vidéo", async () => {
    const response = await supertest(app).get("/api/videogames");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("title");
    expect(response.body[0]).toHaveProperty("img");
  });

  test("GET /api/videogames/get-favs renvoie la liste des favoris d'un utilisateur", async () => {
    const login = await supertest(app)
      .post("/api/users/login")
      .send({ email: "vivien@gmail.com", password: "vivien" });

    const cookie = login.headers["set-cookie"];
    const response = await supertest(app)
      .get("/api/videogames/get-favs/2")
      .set("Cookie", cookie);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toBeInstanceOf(Object);
    expect(response.body[0]).toHaveProperty("title");
    expect(response.body[0]).toHaveProperty("gender");
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe("User API endpoint", () => {
  test("POST /userAction ajoute un nouvel utilisateur", async () => {
    const newUser = {
      firstname: "John",
      lastname: "Doe",
      email: "johndoe@gmail.com",
      password: "coucou",
      confirmPassword: "coucou",
    };

    const response = await supertest(app).post("/api/users").send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message");
  });
  afterAll(async () => {
    await databaseClient.query("delete from user where email=?", [
      "johndoe@gmail.com",
    ]);
    await databaseClient.end();
  });
});

// test("GET /api/users renvoie les utilisateurs", async () => {
//   const response = await supertest(app).get("/api/users/");
//   expect(response.body).toBeInstanceOf(Array);
//   expect(response.body.length).toBeGreaterThan(0);
//   expect(response.body[0]).toHaveProperty("email");
// });

// test("POST /api/users authentifie un utilisateur", async () => {
//   const response = await supertest(app)
//     .post("/api/users/login")
//     .send({ email: "anakin.skywalker@gmail.com", password: "sandhater" });
//   expect(response.status).toBe(200);
// });

// test("POST /api/users authentifie John Doe", async () => {
//   const response = await supertest(app)
//     .post("/api/users/login")
//     .send({ email: "johndoe@gmail.com", password: "coucou" });
//   expect(response.status).toBe(200);
//   expect(response.body).toHaveProperty("message");
//   expect(response.body).toHaveProperty("id");
// });

// test("POST /api/auth/check valide la session de l'utilisateur", async () => {
//   const loginResponse = await supertest(app).post("/api/users/login").send({
//     email: "johndoe@gmail.com",
//     password: "coucou",
//   });
//   expect(loginResponse.headers).toHaveProperty("set-cookie");
//   const cookieLog = loginResponse.headers["set-cookie"];

//   const response = await supertest(app)
//     .get("/api/auth/check")
//     .set("Cookie", cookieLog);
//   expect(response.status).toBe(200);
// });

// afterAll(async () => {
//   await databaseClient.query("delete from user where email=?", [
//     "johndoe@gmail.com",
//   ]);
//   await databaseClient.end();
// });
