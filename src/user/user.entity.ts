import { prop, getModelForClass } from "@typegoose/typegoose"
import { ObjectId } from "mongoose";


//typegoose class declaration
class User {
        @prop({type:String}) profilePicture?:string;
        @prop({type:String}) id!:string;
        @prop({type:String}) username!:string;
        @prop({type:Number}) score?:number;
        @prop({type:String}) email!:string;
        @prop({type:String}) password!:string;
        @prop({type:String}) phone?:string;
        @prop({type:Number}) level!:number;
        @prop({type:[String]}) reviews?:string[];
}


const UserModel = getModelForClass(User, {schemaOptions:{
        timestamps: true
}})

export { UserModel, User }
