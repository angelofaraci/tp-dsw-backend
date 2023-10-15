import { Router } from 'express'
import { sanitizeReviewInput, findAll, findOne, add, update, remove, checkIfReviewed, findAllForGame} from './review.controller.js'

export const reviewRouter = Router()

reviewRouter.get('/', findAll)
reviewRouter.get('/:id', findOne)
reviewRouter.post('/', sanitizeReviewInput, add) //HAY QUE CAMBIAR LOS METODOS
reviewRouter.put('/:id', sanitizeReviewInput, update)
reviewRouter.delete('/:id', remove)
reviewRouter.post('/check', checkIfReviewed)
reviewRouter.post('/getreviews', findAllForGame)