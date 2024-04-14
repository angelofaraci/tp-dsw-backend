import { Request, Response, NextFunction } from "express";
import { GameModel, Game } from "./game.entity.js";
import { CounterModel } from "../counter/counter.entity.js";
import { Types } from "mongoose";

const repository = GameModel;
const counter = CounterModel;

//verifies inputs
function sanitizeGameInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    id: req.body.id, 
    name: req.body.name,
    description: req.body.description,
    cover: req.body.cover,
    banner: req.body.banner,
    release_date: req.body.release_date,
    website: req.body.website,
    socials: req.body.socials,
    rating: req.body.rating,
  };

  next();
}

//finds all games in the schema
async function findAll(req: Request, res: Response) {
  res.status(200).json({ data: await repository.find() });
}

//finds a game by id and returns its data
async function findOne(req: Request, res: Response) {
  const id = req.params.id;
  const game = await repository.findOne({ id: id });
  if (!game) {
    return res.status(404).send({ message: "Game not found" });
  }
  return res.status(200).json({ data: game });
}

//finds the games desired by date and returns its data
async function findCantByDate(req: Request, res: Response) {
  const cant = +req.params.cant;

  return res
    .status(200)
    .json({
      data: await repository.find().limit(cant).sort({ release_date: "desc" }),
    });
}

//adds a game to the repository
async function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput;
  const game = await repository.findOne({ name: input.name });

  if (game) {
    return res
      .status(400)
      .send({ message: "Game with that name already exists" });
  }
  const newId = (
    await counter.findOneAndUpdate(
      {},
      { $inc: { game_id: 1 } },
      { returnNewDocument: false, upsert: true }
    )
  )?.game_id;
  input.id = newId;
  const newGame = new repository(input);
  if (newGame.id && newGame.name) {
    newGame.save();
    return res.status(201).send({ message: "Game created", data: newGame });
  } else return res.status(400).send({ message: "Invalid input" });
}

//finds a game by id and updates by the req body
async function update(req: Request, res: Response) {
  const game_id = req.params.id;
  const input = req.body.sanitizedInput;
  const game = await repository.findOneAndUpdate({ id: game_id }, input);
  console.log (game)
  if (!game) {
    return res.status(404).send({ message: "Game not found" });
  }
  return res
    .status(200)
    .send({ message: "Game updated successfully", data: game });
}

//finds a game by id and deletes it
async function remove(req: Request, res: Response) {
  const id = req.params.id;
  const game = await repository.findOne({ id: id });
  if (game) {
    await repository.deleteOne({ id: id });
    return res
      .status(200)
      .send({ message: "Game deleted successfully", data: game });
  }
  return res.status(401).send("Something went wrong");
}
export {
  sanitizeGameInput,
  findAll,
  findOne,
  findCantByDate,
  add,
  update,
  remove,
};
