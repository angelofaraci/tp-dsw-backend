import { ReviewModel, Review } from "./review.entity.js"
import { User } from "../user/user.entity.js"
import { Game, GameModel } from "../game/game.entity.js"
import mongoose, { Types } from "mongoose"


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

   //checks if an user has already reviewed this game

public async checkIfReviewed(userId: any, gameId: any): Promise < boolean | undefined >{
   
   const user_id = new Types.ObjectId(userId)
   const game_id = new Types.ObjectId(gameId)
   const review = await ReviewModel.findOne({ $and: [{ userId: user_id }, { gameId: game_id }] }) || undefined

   if(review){
      return true 
   } else {
      return false 
   }

}
}





