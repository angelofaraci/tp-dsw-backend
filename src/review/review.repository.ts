import { ReviewModel, Review } from "./review.entity.js"
import { User } from "../user/user.entity.js"
import { Game, GameModel } from "../game/game.entity.js"
import mongoose, { ObjectId, Types } from "mongoose"


export class ReviewRepository {
   public async findAll(): Promise<Review[] | undefined> {
      return await ReviewModel.find()
   }
   
//searchs by id and returns one object
   public async findOne(item: Partial<Review> ): Promise< Review | undefined> {
       return await ReviewModel.findOne({id: item.id}).populate('userId') || undefined
   
   }

public async calculateScore(gameId: any){
   const game_id = new Types.ObjectId(gameId)
   const gameReviews: any = await ReviewModel.find({ gameId: game_id }) || undefined
   let scoreAcum = 0
      for(let i=0; i<gameReviews.length; i++){
         
         scoreAcum = scoreAcum + gameReviews[i].rating
      }
   const calculatedRating = scoreAcum / gameReviews.length
   const calculatedRatingRounded = Math.round(calculatedRating)

   const game: any = await GameModel.findById(game_id) || undefined
   game.rating = calculatedRatingRounded

   const result = await GameModel.findByIdAndUpdate(game_id, game) || undefined
   
}

//adds an object to the db
   public async add(item:Review): Promise < Review | undefined> {
      const newReview = new ReviewModel(item)
      if (await ReviewModel.findById(item.id)){
         return undefined
      }
      await newReview.save()

      return newReview
   }

//searchs an object and updates it
   public async update(item: Review, userId: Types.ObjectId): Promise < Review | undefined > {
      const result = await ReviewModel.findOneAndUpdate({userId: userId}, item)
      return result || undefined
   }


//searchs an object and deletes it
   public async remove(id: string): Promise< Review | undefined>{
      return await ReviewModel.findOneAndDelete(new Types.ObjectId(id)) || undefined
   }

   //checks if an user has already reviewed this game

public async findAllForGame(gameId: any){
   const game_id = new Types.ObjectId(gameId)
   const gameReviews = ReviewModel.find({ gameId: game_id }).populate('userId')
   return gameReviews
   
}


//game 652b2db71569f510653bc6e7
//user1 65286ed487478558c888c57b
//user2 652c3e0583536838c10cbce5
//user3 652c3e1583536838c10cbce8


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





