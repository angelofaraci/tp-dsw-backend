import { getModelForClass, prop } from "@typegoose/typegoose"
import { ObjectId, Types } from "mongoose";

class Review{
    @prop({type:String, required:true}) public id!:string;
    @prop({type:Number}) public rating?:number;
    @prop({type:String, required:true}) public body!:string;
    @prop({type:Boolean, required:true}) public spoiler_check!:boolean;
    @prop({type:String, required:true}) public state!:string;
    @prop({type: Types.ObjectId, required:true}) public userId!:{type: Types.ObjectId, ref: 'user' };

};

const ReviewModel = getModelForClass(Review, {schemaOptions:{
    timestamps: true
}});
export { ReviewModel, Review };