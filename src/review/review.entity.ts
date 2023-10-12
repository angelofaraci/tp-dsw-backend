import { Ref, getModelForClass, prop } from "@typegoose/typegoose"
import { ObjectId, Types } from "mongoose";
import { User, UserModel } from "../user/user.entity.js";
import { Game, GameModel } from "../game/game.entity.js";

class Review{
    @prop({type:String, required:true}) public id!:string;
    @prop({type:Number}) public rating?:number;
    @prop({type:String, required:true}) public body!:string;
    @prop({type:Boolean, required:true}) public spoiler_check!:boolean;
    @prop({type:String, required:true}) public state!:string;
    @prop({type:Types.ObjectId, ref: User}) public userId?:Types.ObjectId;
    @prop({type:Types.ObjectId, ref: Game}) public gameId?:Types.ObjectId;
};

const ReviewModel = getModelForClass(Review, {schemaOptions:{
    timestamps: true
}});
export { ReviewModel, Review };