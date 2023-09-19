import { User } from "./user.entity.js"
import jwt from 'jsonwebtoken';

export class UserRepository {
    public async add(input:any):Promise<string | undefined>{
        const newUser = new User(input)
        await newUser.save()
        return jwt.sign({_id: newUser._id}, 'secretKey')
    }

    public async getOne(email:string, password:string): Promise<string| number | undefined>{
        const userLogIn = await User.findOne({email: email})
        if (!userLogIn) return 1
        if (userLogIn.password !== password) return 2
        return jwt.sign({_id: userLogIn._id}, 'secretKey')
    }
}