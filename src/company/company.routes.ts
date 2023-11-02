import { Router } from 'express';
import { sanitizeCompanyInput, findAll, findOne, add, update, remove } from './company.controller.js';

export const companyRouter = Router();

companyRouter.get('/', findAll);
companyRouter.get('/:id', findOne);
companyRouter.post('/', sanitizeCompanyInput, add);
companyRouter.put('/:id', sanitizeCompanyInput, update);
companyRouter.delete('/:id', remove);