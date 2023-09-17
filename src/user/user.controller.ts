import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';
import { User } from './user.entity.js';

function sanitizeGameInput(req:Request, res:Response, next: NextFunction ) {
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
    const newUser = new User(input)
    await newUser.save()
    const token = jwt.sign({_id: newUser._id}, 'secretKey')
    res.status(201).json({token})
}

export { sanitizeGameInput, add }