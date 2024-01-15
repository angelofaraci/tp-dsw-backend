import app from "../src/app";
import supertest from "supertest";
import { test } from "@jest/globals";
import mongoose from "mongoose";
const api = supertest(app);

test("return all games in JSON format", async () => {
  await api.get("/api/games").expect(200).expect('Content-Type', /application\/json/);
 
  
});
