import { Router } from 'express'
import { sanitizeUserInput, add, getOne, verifyToken } from './user.controller.js';

export const userRouter = Router()

userRouter.post('/signup', sanitizeUserInput, add)
userRouter.post('/login', sanitizeUserInput, getOne)
