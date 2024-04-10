import { Router } from 'express';
import { sanitizeUserInput, add, getOne, verifyToken, getUserData, changeLevel, changeUsername, deleteUser, getOneUserPublicData } from './user.controller.js';

export const userRouter = Router();

userRouter.post('/signup', sanitizeUserInput, add);
userRouter.post('/login', sanitizeUserInput, getOne);
userRouter.get('/profile', verifyToken, getUserData);
userRouter.get('/user/:username', getOneUserPublicData)
userRouter.put('/levelUp', sanitizeUserInput, changeLevel);
userRouter.put('/update', sanitizeUserInput, verifyToken, changeUsername);
userRouter.delete('/:id', deleteUser);
