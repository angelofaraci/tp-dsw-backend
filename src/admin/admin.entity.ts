import { prop, getModelForClass } from "@typegoose/typegoose";



//typegoose class declaration
class Admin {
        @prop({type:String}) id!:string;
        @prop({type:String}) name!:string;
        @prop({type:String}) email!:string;
        @prop({type:String}) password!:string;
};


const AdminModel = getModelForClass(Admin, {schemaOptions:{
        timestamps: true
}});

export { AdminModel, Admin };
