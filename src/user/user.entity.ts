import { prop, getModelForClass } from "@typegoose/typegoose"

class UserClass {
        
        @prop({type:String})
        id!:string;
        @prop({type:String})
        username!:string;
        @prop({type:Number})
        score?:number;
        @prop({type:String})
        email!:string;
        @prop({type:String})
        password!:string;
        @prop({type:String})
        phone?:string;
        @prop({type:Number})
        level!:number;

}
const User = getModelForClass(UserClass, {schemaOptions:{
        timestamps: true
}})

export { User, UserClass }
