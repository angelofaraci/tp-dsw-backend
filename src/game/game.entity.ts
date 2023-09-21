import { Schema, model } from "mongoose";

const gameSchema = new Schema({

    id : String,
    name: String,
    description: String,
    cover: String,
    release_date: Date,
    website: String,
    socials : [String],
    rating : Number,

},{
    timestamps: true
});

export const Game = model('Game', gameSchema)

    