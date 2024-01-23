import { Router } from 'express';
import { sanitizeReviewInput, findAll, findOne, add, update, remove, checkIfReviewed, findAllForGame ,findAllForUser, calculateScore } from './review.controller.js';

export const reviewRouter = Router();

reviewRouter.get('/', findAll);
reviewRouter.get('/:id', findOne);
reviewRouter.post('/', sanitizeReviewInput, add);
reviewRouter.put('/:id', update);
reviewRouter.delete('/:id', remove);
reviewRouter.post('/check', checkIfReviewed);
reviewRouter.post('/getreviews/game', calculateScore, findAllForGame);
reviewRouter.post('/getreviews/user', findAllForUser);