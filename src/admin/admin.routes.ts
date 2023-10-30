import { Router } from 'express'
import { sanitizeAdminInput, add, getOne, verifyToken, verifyAdmin  , getAdminData } from './admin.controller.js';

export const adminRouter = Router()



adminRouter.post('/signup', sanitizeAdminInput, add)
adminRouter.post('/login', sanitizeAdminInput, getOne)
adminRouter.get('/profile', verifyToken, getAdminData)
adminRouter.get('/verify', verifyAdmin)
