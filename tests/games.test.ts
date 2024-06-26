import { app, server } from "../src/app";
import supertest from "supertest";
import { test } from "@jest/globals";
import mongoose from "mongoose";
const api = supertest(app);
import { Game } from "../src/game/game.entity.js";

let _idGame = "";
let idGame = ""

test("return all games in JSON format", async () => {
  await api
    .get("/api/games")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("a valid game can be added", async () => {
  const newGame: Game = {
    name: "Mario",
    id: ""
  };
  const response = await api
    .post("/api/games")
    .send(newGame)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  _idGame = response.body.data._id;
  idGame = response.body.data.id
});

test("a game can be found", async () => {
  await api
    .get(`/api/games/${idGame}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("a game's name can be changed", async () => {
  const updatedGame: Game = {
    name: "Sonic",
    id: idGame
  }
  await api
    .put(`/api/games/${idGame}`)
    .send(updatedGame)
    .expect(200)
    .expect("Content-Type", /application\/json/);
})

test("a game can be deleted", async () => {
  await api.delete(`/api/games/${idGame}`).expect(200);
});

test("a game without name or id cant be created", async () => {
  await api
    .post("/api/games")
    .send({})
    .expect(400)
    .expect({ message: "Invalid input" });
});

afterAll(() => {
  server.close();
  mongoose.connection.close();
});
