import { User, UserModel } from "./user.entity.js"
import jwt from 'jsonwebtoken'
import { Review, ReviewModel } from "../review/review.entity.js"
import mongoose from "mongoose"



//exports the repository and its methods
export class UserRepository {
    
    public async add(item:User):Promise<string | undefined>{
        const newUser = new UserModel(item)
        if (await UserModel.findOne({email: item.email})){
            return undefined
         }
        await newUser.save()
        return jwt.sign({_id: newUser._id}, 'secretKey')
    }

//adds a review to the reviews collection
// public async addReview(reviewId: string, userId: mongoose.Types.ObjectId){
//     try{
//         const user = await UserModel.findById(userId) || undefined
//         const review_id = new mongoose.Types.ObjectId(reviewId)
//         if(!user?.reviews?.includes(review_id)){
//             user?.reviews?.push(review_id)
//         }
//         const result = await UserModel.findOneAndUpdate({_id: user?._id}, user)
//         console.log(user?.populate('Reviews'))
      
      
//     }catch(error){
//         console.log(error)
//     }
    
// }

//Searchs by email and returns a token

    public async getOne(email:string, password:string ): Promise<string | unknown>{
        try{
            const userLogIn = await UserModel.findOne({email: email}) || undefined
            if (!userLogIn) {throw new Error('Wrong Email')}
            if (userLogIn.password !== password) {throw new Error('Wrong Password')}
            return jwt.sign({_id: userLogIn._id}, 'secretKey')
        } catch(error: any){
             return error.message
        }   
    }
  
//Searchs by _id and returns JSON data
    public async recoverOne(id:string): Promise<User | undefined>{
        const user = await UserModel.findById(id)
        if (user){
            return user || undefined
        } 
    }

    public async recoverOneByEmail(email:string): Promise<User | undefined>{
        try{
            const user = await UserModel.findOne({email: email}) || undefined
            if (!user) {throw new Error('Wrong Email')}
            return user
        } catch(error: any){
             return error.message
        }
    }

    public async update(item: User): Promise < User | undefined > {
        const result = await UserModel.findOneAndUpdate(item)
        return result || undefined
     }

        
}