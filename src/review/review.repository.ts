import mongoose from "mongoose";
import { Review } from "./review.entity.js";


export class ReviewRepository {
   public async findAll(): Promise<{}[] | undefined> {
      return await Review.find()
   }
   
   public async findOne(item: { id: string; }): Promise<{}| null | undefined> {
      return await Review.findOne({id: item.id})
   }

   public async add(item:any): Promise <{} | undefined> {
      const newReview = new Review(item)
      if (await Review.findOne({id: item.id})){
         return undefined
      }
      await newReview.save(item)
      return item
   }
   public async update(item: {}): Promise <{} | null | undefined> {
      return await Review.findOneAndUpdate(item)
   }

   public async remove(item:{}): Promise<{} | null | undefined>{
      return await Review.findOneAndDelete(item)
   }
}



