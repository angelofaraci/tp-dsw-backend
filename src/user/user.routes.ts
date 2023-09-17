import { Router } from 'express'
import { sanitizeGameInput, add } from './user.controller.js';

export const userRouter = Router()

userRouter.post('/', sanitizeGameInput, add)

