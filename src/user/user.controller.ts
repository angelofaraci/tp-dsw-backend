import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';
import { UserRepository } from './user.repository.js';

const repository = new UserRepository

function sanitizeUserInput(req:Request, res:Response, next: NextFunction ) {
    req.body.sanitizedInput = {
        id: req.body.id, //REVISAR!!!!!!!!!!!!!!
        username : req.body.username,
        score : req.body.score,
        email : req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        level: req.body.level
    }
    
      next()

}


async function add (req: Request, res: Response, next: NextFunction) {
 
    const input = req.body.sanitizedInput
    const token = await repository.add(input)
    if(!token){
        return res.status(400).send({message: "User already exists"})
    }
    res.status(201).json({token})
}

async function getOne(req: Request, res: Response){

    const email = req.body.email
    const password  = req.body.password
    const token = await repository.getOne(email, password)
    if ( token === 'Wrong Email' || token === 'Wrong Password') {
        const error = token
        return res.status(401).send({error})
    }
    else {res.status(200).json({token})}
}


async function getUserData(req:Request, res:Response, next: NextFunction){
    const userData = await repository.recoverOne(res.locals.userId)
    return res.status(200).json({userData})
}

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

export { sanitizeUserInput, add, getOne, verifyToken, getUserData }

