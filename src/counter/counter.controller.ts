import { CounterModel } from "./counter.entity.js";

const repository = CounterModel;
let counter = await repository.findOne();

if (!counter) {
    counter = await new repository({game_id:0})
    counter.save()
}
