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


//Busca usuario por email y devuelve token
    public async getOne(email:string, password:string ): Promise<string| number | undefined | unknown>{
        try{
            const userLogIn = await User.findOne({email: email}) || undefined
            if (!userLogIn) throw new Error('Wrong Email')
            if (userLogIn.password !== password) throw new Error('Wrong Password')
            return jwt.sign({_id: userLogIn._id}, 'secretKey')
        } catch(error: any){
             return error.message
        }
        
        
    }

    
//Busca usuario por _id y devuelve sus datos
    public async recoverOne(id:string): Promise<{}| null | undefined>{
        const user = await User.findById(id) 
        if (user) return user
    }
}