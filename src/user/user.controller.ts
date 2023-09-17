import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';
import { User } from './user.entity.js';

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
    const newUser = new User(input)
    await newUser.save()
    const token = jwt.sign({_id: newUser._id}, 'secretKey')
    res.status(201).json({token})
}

async function getOne (req: Request, res: Response, next: NextFunction){

    const { email, password } = req.body.sanitizedInput
    const userLogIn = await User.findOne({email: email})
    if (!userLogIn) return res.status(401).send("Wrong Email")
    if (userLogIn.password !== password) return res.status(401).send("Wrong Password")
    const token = jwt.sign({_id: userLogIn._id}, 'secretKey')
    res.status(200).json({token})
}



export { sanitizeUserInput, add, getOne }