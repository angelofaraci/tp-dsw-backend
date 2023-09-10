import { Router } from 'express'
import { sanitizeReviewInput, findAll, findOne, add, update, remove } from './review.controller.js'

export const characterRouter = Router()

characterRouter.get('/', findAll)
characterRouter.get('/:id', findOne)
characterRouter.post('/', sanitizeReviewInput, add)
characterRouter.put('/:id', sanitizeReviewInput, update)
characterRouter.patch('/:id', sanitizeReviewInput, update)
characterRouter.delete('/:id', remove)