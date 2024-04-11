import { CounterModel } from "./counter.entity.js";

const repository = CounterModel;
let counter = await repository.findOne();

//it serves the purpose of auto increment the game id

if (!counter) {
  counter = await new repository({ game_id: 0 });
  counter.save();
}
