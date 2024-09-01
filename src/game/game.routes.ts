import { Router } from 'express';
import { sanitizeGameInput, findAll, findOne, findCantByDate, findCantByRating, add, update, remove } from './game.controller.js';

export const gameRouter = Router();

gameRouter.get('/', findAll);
gameRouter.get('/:id', findOne);
gameRouter.get('/date/:cant', findCantByDate);
gameRouter.get('/rating/:cant', findCantByRating);
gameRouter.post('/', sanitizeGameInput, add);
gameRouter.put('/:id', sanitizeGameInput, update);
gameRouter.delete('/:id', remove);