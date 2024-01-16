import { app, server } from "../src/app";
import supertest from "supertest";
import { test } from "@jest/globals";
import mongoose from "mongoose";
const api = supertest(app);
import { Game, GameModel } from "../src/game/game.entity.js";

let _idGame = ''

test("return all games in JSON format", async () => {
  await api
    .get("/api/games")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("a valid game can be added", async () => {
  const newGame: Game = {
    id: "10",
    name: "Mario",
  };
    const response = await api
    .post("/api/games")
    .send(newGame)
    .expect(201)
    .expect("Content-Type", /application\/json/);
    _idGame = response.body.data._id
});

test('a game can be found', async () =>
{await api.get(`/api/games/10`).expect(200).expect("Content-Type", /application\/json/);}
)

test('a game can be deleted', async () => {await api.delete(`/api/games/${_idGame}`).expect(204)})

afterAll(() => {
  server.close();
  mongoose.connection.close();
});
