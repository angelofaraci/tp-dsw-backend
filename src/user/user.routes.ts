import { Router } from 'express'
import { sanitizeUserInput, add, getOne, verifyToken, getUserData } from './user.controller.js';

export const userRouter = Router()

userRouter.post('/signup', sanitizeUserInput, add)
userRouter.post('/login', sanitizeUserInput, getOne)
userRouter.get('/profile', verifyToken, getUserData)
