import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';
import { User } from './user.entity.js';
import mongoose from 'mongoose';
import { log } from 'console';
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
    const token = repository.add(input)
    res.status(201).json({token})
}

async function getOne (req: Request, res: Response){

    const email = req.params.email
    const password  = req.params.password
    const token = repository.getOne(email, password)
    if (await token === 1) return res.status(401).send("Wrong Email")
    if (await token === 2) return res.status(401).send("Wrong Password")
    res.status(200).json({token})
}


async function getUserData(req:Request, res:Response, next: NextFunction){
    // const id = res.locals.userId
    // const idBuscado = `ObjectId("${id}")`
    // const userData = await User.findOne({_id: idBuscado})
    // console.log(userData)
    
    

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

