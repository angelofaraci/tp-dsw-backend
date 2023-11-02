import { Router } from 'express';
import { sanitizeAdminInput, add, getOne, verifyToken , getAdminData } from './admin.controller.js';

export const adminRouter = Router();

adminRouter.post('/signup', sanitizeAdminInput, add);
adminRouter.post('/login', sanitizeAdminInput, getOne);
adminRouter.get('/profile', verifyToken, getAdminData);
