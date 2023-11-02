import { getModelForClass, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { User } from "../user/user.entity.js";
import { Game } from "../game/game.entity.js";

class Review{
    @prop({type:String, required:false}) public id?:string;
    @prop({type:Number}) public rating?:number;
    @prop({type:String, required:true}) public body!:string;
    @prop({type:Boolean, required:false}) public spoiler_check?:boolean;
    @prop({type:Boolean, required:false}) public private?:boolean;
    @prop({type:Types.ObjectId, ref: User}) public userId?:Types.ObjectId;
    @prop({type:Types.ObjectId, ref: Game}) public gameId?:Types.ObjectId;
};

const ReviewModel = getModelForClass(Review, {schemaOptions:{
    timestamps: true
}});
export { ReviewModel, Review };