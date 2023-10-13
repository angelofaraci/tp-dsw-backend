import { ReviewModel, Review } from "./review.entity.js"
import { User } from "../user/user.entity.js"
import { Game, GameModel } from "../game/game.entity.js"
import mongoose from "mongoose"


export class ReviewRepository {
   public async findAll(): Promise<Review[] | undefined> {
      return await ReviewModel.find()
   }
   
//searchs by id and returns one object
   public async findOne(item: Partial<Review> ): Promise< Review | undefined> {
       return await ReviewModel.findOne({id: item.id}) || undefined
   
   }


public async updateUser(review: Review){
   
}
//adds an object to the db
   public async add(item:Review): Promise < Review | undefined> {
      console.log('entra aca')
      const newReview = new ReviewModel(item)
      if (await ReviewModel.findOne({id: item.id})){
         return undefined
      }
      await newReview.save()

      return newReview
   }

//searchs an object and updates it
   public async update(item: Review): Promise < Review | undefined > {
      const result = await ReviewModel.findOneAndUpdate(item)
      return result || undefined
   }


//searchs an object and deletes it
   public async remove(item:Partial<Review>): Promise< Review | undefined>{
      return await ReviewModel.findOneAndDelete(item) || undefined
   }
}



