import { Router } from 'express'
import { sanitizeLevelingInput, findAll, findOne, add, update, remove} from './leveling.controller.js'

export const levelingRouter = Router()

levelingRouter.get('/', findAll)
levelingRouter.get('/:id', findOne)
levelingRouter.post('/', sanitizeLevelingInput, add) //HAY QUE CAMBIAR LOS METODOS
levelingRouter.put('/:id', sanitizeLevelingInput, update)
levelingRouter.delete('/:id', remove)