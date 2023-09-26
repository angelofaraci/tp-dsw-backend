import { getModelForClass, prop } from "@typegoose/typegoose"

class ReviewClass{
    @prop({type:String, required:true})
    public id!:string;
    @prop({type:Number})
    public rating?:number;
    @prop({type:String, required:true})
    public body!:string;
    @prop({type:Boolean, required:true})
    public spoiler_check!:boolean;
    @prop({type:String, required:true})
    public state!:string;

};

const Review = getModelForClass(ReviewClass, {schemaOptions:{
    timestamps: true
}});
export { Review, ReviewClass };