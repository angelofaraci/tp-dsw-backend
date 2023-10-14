import { Ref, getModelForClass, prop } from "@typegoose/typegoose"

class Interaction{
    @prop({type:String, required:false}) public id?:string;
    @prop({type:String, required:true}) public state!:string;
};

const InteractionModel = getModelForClass(Interaction, {schemaOptions:{
    timestamps: true
}});
export { InteractionModel, Interaction };