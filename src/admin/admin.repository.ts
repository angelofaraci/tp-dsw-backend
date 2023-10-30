import { Admin, AdminModel } from "./admin.entity.js"
import jwt from 'jsonwebtoken'




//exports the repository and its methods
export class AdminRepository {
    
    public async add(item:Admin):Promise<string | undefined>{
        const newAdmin = new AdminModel(item)
        if (await AdminModel.findOne({email: item.email})){
            return undefined
         }
        await newAdmin.save()
        return jwt.sign({_id: newAdmin._id, class:Admin}, 'adminKey')
    }


//Searchs by email and returns a token

    public async getOne(email:string, password:string ): Promise<string | unknown>{
        try{
            const adminLogIn = await AdminModel.findOne({email: email}) || undefined
            if (!adminLogIn) {throw new Error('Wrong Email')}
            if (adminLogIn.password !== password) {throw new Error('Wrong Password')}
            return jwt.sign({_id: adminLogIn._id, class:Admin}, 'adminKey')
        } catch(error: any){
             return error.message
        }   
    }
  
//Searchs by _id and returns JSON data
    public async recoverOne(id:string): Promise<Admin | undefined>{
        const admin = await AdminModel.findById(id)
        if (admin){
            return admin || undefined
        } 
    }

//Searchs an admin and update it  
    public async update(item: Admin): Promise < Admin| undefined > {
        const result = await AdminModel.findOneAndUpdate(item)
        return result || undefined
     }

//searchs an object and deletes it
   public async remove(item:Partial<Admin>): Promise< Admin | undefined>{
    return await AdminModel.findOneAndDelete(item) || undefined
 }
}