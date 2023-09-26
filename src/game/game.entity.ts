import { prop, getModelForClass} from "@typegoose/typegoose"

class GameClass{
    @prop({type:String})
    id!:string;
    @prop({type:String})
    name!:string;
    @prop({type:String})
    description?: string;
    @prop({type:String})
    cover?: string;
    @prop({type:Date})
    release_date?: string;
    @prop({type:String})
    website?: string;
    @prop({type:[String]})
    socials?: string[];
    @prop({type:Number})
    rating?: number;
}

const Game = getModelForClass(GameClass, {schemaOptions:{
    timestamps:true
}});

export {GameClass, Game}

    