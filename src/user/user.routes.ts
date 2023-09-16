import { Router } from 'express'
import { User } from './user.entity.js'
import jwt from 'jsonwebtoken';

export const userRouter = Router()

userRouter.post('/', async (req, res) => {
    const object = req.body
    const newUser = new User(object)
    await newUser.save()
    const token = jwt.sign({_id: newUser._id}, 'secretKey')
    res.status(201).json({token})
})

