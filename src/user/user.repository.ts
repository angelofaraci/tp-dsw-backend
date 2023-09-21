import { User } from "./user.entity.js"
import jwt from 'jsonwebtoken';

export class UserRepository {
    public async add(item:any):Promise<string | undefined>{
        const newUser = new User(item)
        if (await User.findOne({email: item.email})){
            return undefined
         }
        await newUser.save(item)
        return jwt.sign({_id: newUser._id}, 'secretKey')
    }

    public async getOne(email:string, password:string ): Promise<string| number | undefined>{
        const userLogIn = await User.findOne({email: email})
        if (!userLogIn) return 1
        if (userLogIn.password !== password) return 2   
        return jwt.sign({_id: userLogIn._id}, 'secretKey')
    }

    public async recoverOne(id:string): Promise<{}| null | undefined>{
        const user = await User.findById(id) 
        if (user) return user
    }
}