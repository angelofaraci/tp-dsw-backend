import { Router } from 'express';
import { sanitizeReviewInput, findAll, findOne, add, update, remove } from './game.controller.js';
export const gameRouter = Router();
gameRouter.get('/', findAll);
gameRouter.get('/:id', findOne);
gameRouter.post('/', sanitizeReviewInput, add);
gameRouter.put('/:id', sanitizeReviewInput, update);
gameRouter.delete('/:id', remove);
//# sourceMappingURL=game.routes.js.map