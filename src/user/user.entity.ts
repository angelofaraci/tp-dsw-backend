import { Schema, model } from "mongoose";



 const userSchema = new Schema({
    
         id: String,
         username: String,
         score: Number,
         email: String,
         password: String,
         phone: String,
         level: Number

}, {
        timestamps: true
});

export const User = model('User', userSchema)

