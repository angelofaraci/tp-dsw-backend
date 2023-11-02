import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';
import { User, UserModel } from "./user.entity.js"
import { Types } from 'mongoose';
import { ReviewModel } from '../review/review.entity.js';

const repository = UserModel


//verifies inputs

function sanitizeUserInput(req:Request, res:Response, next: NextFunction ) {
    req.body.sanitizedInput = {
        id: req.body.id, //REVISAR!!!!!!!!!!!!!!
        username : req.body.username,
        score : req.body.score,
        email : req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        level: req.body.level,
    }
    
      next()

}

//adds an object to the repository 

async function add (req: Request, res: Response, next: NextFunction) {
 
    const input = req.body.sanitizedInput
    input.level = 1;
    const newUser = new repository(input)
        if (await repository.findOne({email: input.email})){
            return undefined
         }
    await newUser.save()
    const token = jwt.sign({_id: newUser._id}, 'secretKey')
    if(!token){
        return res.status(400).send({message: "User already exists"})
    }
    res.status(201).json({token})
}

//sends email and password of an User and returns the correspondent JSON object

async function getOne(req: Request, res: Response){

    const email = req.body.email
    const password  = req.body.password
    try{
        const userLogIn = await repository.findOne({email: email}) || undefined
        if (!userLogIn) {throw new Error('Wrong Email')}
        if (userLogIn.password !== password) {throw new Error('Wrong Password')}
        const token = jwt.sign({_id: userLogIn._id}, 'secretKey')
        return res.status(200).json({token})
    } catch(error: any){
        const message = error.message
        return res.status(401).send({message})
    }   
}

//sends an _id to the repository and returns the correspondent JSON object

async function getUserData(req:Request, res:Response, next: NextFunction){
    const userData = await repository.findById(res.locals.userId)
    res.locals.user = userData
    return res.status(200).json({userData})
}

//change the username of an User

async function changeUsername(req:Request, res:Response, next: NextFunction){
    const username = req.body.username
    const exists = await repository.findOne({username:username})
    if (exists) {return res.status(400).send({message:'This username is already taken'})}
    const id = res.locals.userId
    const user = await repository.findOneAndUpdate({_id:id}, {username:username}, {new: true})
    if (user){
        return res.status(200).json({user})
    }
    return res.status(401).send({message:'User not found'})
}

//change the level of an User

async function changeLevel(req:Request, res:Response, next:NextFunction) {
    const input = req.body.sanitizedInput
    const user = await repository.findOneAndUpdate({email:input.email}, {level:input.level}, {new: true})
    if (user){
        return res.status(200).json({user})
    }
    return res.status(401).send({message:'User not found'})
}

//verifies token validity

 function verifyToken(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    const token = req.headers.authorization.split(' ')[1]
    if (token === null){
        return res.status(401).send('Unauthorized request')
    }

    const payload: any = jwt.verify(token, 'secretKey')
    res.locals.userId = payload._id
   
    next()
}

//delete an User by its id

async function deleteUser(req: Request, res: Response ){
    const id: Types.ObjectId = new Types.ObjectId(req.params.id)
    await ReviewModel.deleteMany({userId: id})
    const result = await repository.findByIdAndDelete(id)
    if (result){
        return res.status(204).send('User deleted succesfully')
    }
    return res.status(401).send('Something went wrong')
}

export { deleteUser, sanitizeUserInput, add, getOne, verifyToken, getUserData , changeLevel, changeUsername }

