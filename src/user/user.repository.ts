import { User, UserModel } from "./user.entity.js"
import jwt from 'jsonwebtoken'
import { Review, ReviewModel } from "../review/review.entity.js"


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

public async addReview(reviewId: string){
    try{
        const review = await ReviewModel.findById(reviewId) || undefined
        const user = await UserModel.findById(review?.userId) || undefined
        if(!user?.reviews?.includes(reviewId)){
            user?.reviews?.push(reviewId)
        }
        const result = await UserModel.findOneAndUpdate({_id: user?._id}, user)
        return user
      
    }catch(error){
        console.log(error)
    }
    
}

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
}