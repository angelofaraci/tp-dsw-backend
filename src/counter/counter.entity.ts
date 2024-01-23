import { prop, getModelForClass} from "@typegoose/typegoose";

class Counter{
    @prop({type:Number}) game_id!:number;
};

const CounterModel = getModelForClass(Counter);

export {CounterModel, Counter}