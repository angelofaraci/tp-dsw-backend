import { Router } from 'express'
import { sanitizeUserInput, add, getOne } from './user.controller.js';

export const userRouter = Router()

userRouter.post('/', sanitizeUserInput, add)
userRouter.post('/login', sanitizeUserInput, getOne)