import { prop, getModelForClass } from "@typegoose/typegoose"
import {  Types } from "mongoose";
import { Review } from "../review/review.entity.js";


//typegoose class declaration
class User {
        @prop({type:String}) profilePicture?:string;
        @prop({type:String}) id!:string;
        @prop({type:String, unique:true}) username!:string;
        @prop({type:Number}) score?:number;
        @prop({type:String}) email!:string;
        @prop({type:String}) password!:string;
        @prop({type:String}) phone?:string;
        @prop({type:Number}) level!:number;
        //@prop({type:Types.ObjectId, ref: Review }) reviews?:Types.ObjectId[];
};


const UserModel = getModelForClass(User, {schemaOptions:{
        timestamps: true
}});

export { UserModel, User }
