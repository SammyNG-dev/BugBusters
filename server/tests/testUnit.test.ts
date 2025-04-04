import { describe, expect, test } from "@jest/globals";
import app from "../src/app";
import "dotenv/config";
import supertest from "supertest";
import databaseClient from "../database/client";
import type { Rows } from "../database/client";

// Suite de tests pour l'endpoint userAction
describe("User API Endpoints", () => {
  test("GET api/user renvoie des utilisateurs", async () => {
    const rows = [{}] as Rows;
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [rows, []]);
    const response = await supertest(app).get("/api/users");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe("Auth API endpoint", () => {
  test("POST /api/auth/check refuse l'accès car il n'y a pas de token valide", async () => {
    const response = await supertest(app).get("/api/auth/check");

    expect(response.status).toBe(401);
  });
});
