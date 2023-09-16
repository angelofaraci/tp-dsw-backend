import { Schema, model } from "mongoose";


 const userSchema = new Schema({
    
         id: String,
         name_user: String,
         score: Number,
         email: String,
         phone: String,
         level: Number

});

module.exports('User', userSchema)