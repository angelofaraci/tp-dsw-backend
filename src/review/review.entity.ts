import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
        
    id :String,
    rating: Number,
    body: String,
    spoiler_check: Boolean,
    state: String
        
}, {
    timestamps:true
});

export const Review = model('Review', reviewSchema)