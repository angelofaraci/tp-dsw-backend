import { Router } from 'express';
import { sanitizeInteractionInput, findAll, findOne, add, update, remove } from './interaction.controller.js';

export const interactionRouter = Router();

interactionRouter.get('/', findAll);
interactionRouter.get('/:id', findOne);
interactionRouter.post('/', sanitizeInteractionInput, add);
interactionRouter.put('/:id', sanitizeInteractionInput, update);
interactionRouter.delete('/:id', remove);