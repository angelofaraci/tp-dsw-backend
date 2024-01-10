import { Router } from 'express';
import { sanitizeGameInput, findAll, findOne, add, update, remove } from './game.controller.js';

export const gameRouter = Router();

gameRouter.get('/', findAll);
gameRouter.get('/:id', findOne);
gameRouter.post('/', sanitizeGameInput, add);
gameRouter.put('/:id', sanitizeGameInput, update);
gameRouter.delete('/:id', remove);