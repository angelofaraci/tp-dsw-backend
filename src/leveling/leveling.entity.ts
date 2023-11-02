import { getModelForClass, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { User } from "../user/user.entity.js";
import { Admin } from "../admin/admin.entity.js";

class Leveling{
    @prop({type:String, required:false}) public id?:string;
    @prop({type:Number, required:true}) public previousLevel!:number;
    @prop({type:Number, required:true}) public newLevel!:number;
    @prop({type:String, required:false}) public observation?:string;
    @prop({type:Types.ObjectId, ref: User, required:true}) public userId?:Types.ObjectId;
    @prop({type:Types.ObjectId, ref: Admin, required:true}) public adminId?:Types.ObjectId;
};

const LevelingModel = getModelForClass(Leveling, {schemaOptions:{
    timestamps: true
}});
export { LevelingModel, Leveling };