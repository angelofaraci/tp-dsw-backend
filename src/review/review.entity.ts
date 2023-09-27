import { getModelForClass, prop } from "@typegoose/typegoose"

class Review{
    @prop({type:String, required:true}) public id!:string;
    @prop({type:Number}) public rating?:number;
    @prop({type:String, required:true}) public body!:string;
    @prop({type:Boolean, required:true}) public spoiler_check!:boolean;
    @prop({type:String, required:true}) public state!:string;

};

const ReviewModel = getModelForClass(Review, {schemaOptions:{
    timestamps: true
}});
export { ReviewModel, Review };