import { getModelForClass, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { User } from "../user/user.entity.js";
import { Game } from "../game/game.entity.js";

class LikeState {
  @prop({ type: String }) userId!: string;
  @prop({ type: String }) state!: string;
}

class Review {
  @prop({ type: String, required: false }) public id?: string;
  @prop({ type: Number }) public rating!: number;
  @prop({ type: String, required: true }) public body!: string;
  @prop({ type: Boolean, required: false }) public spoiler_check?: boolean;
  @prop({ type: Boolean, required: false }) public private?: boolean;
  @prop({ type: Types.ObjectId, ref: User }) public userId?: Types.ObjectId;
  @prop({ type: Types.ObjectId, ref: Game }) public gameId?: Types.ObjectId;
  @prop({ type: Number, required: true, default: 0 }) public likes!: number;
  @prop({ type: [LikeState], required: true, default: [] })
  public likeState!: LikeState[];
}

const ReviewModel = getModelForClass(Review, {
  schemaOptions: {
    timestamps: true,
  },
});
export { ReviewModel, Review, LikeState };
