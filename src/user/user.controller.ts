import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';
import { UserRepository } from './user.repository.js';
import { User, UserModel } from "./user.entity.js"
import { RefOptionIsUndefinedError } from '@typegoose/typegoose/lib/internal/errors.js';

const repository = new UserRepository


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
    const newUser = new UserModel(input)
        if (await UserModel.findOne({email: input.email})){
            return undefined
         }
    await newUser.save()
    const token = jwt.sign({_id: newUser._id}, 'secretKey')
    if(!token){
        return res.status(400).send({message: "User already exists"})
    }
    res.status(201).json({token})
}

async function getOne(req: Request, res: Response){

    const email = req.body.email
    const password  = req.body.password
    try{
        const userLogIn = await UserModel.findOne({email: email}) || undefined
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
    const userData = await UserModel.findById(res.locals.userId)
    res.locals.user = userData
    return res.status(200).json({userData})
}

async function changeLevel(req:Request, res:Response, next:NextFunction) {
    const input = req.body.sanitizedInput
    const user = await UserModel.findOneAndUpdate({email:input.email}, {level:input.level}, {new: true})
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

export { sanitizeUserInput, add, getOne, verifyToken, getUserData , changeLevel}

