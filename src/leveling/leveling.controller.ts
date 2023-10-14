import { Request, Response, NextFunction } from 'express'
import { LevelingRepository } from './leveling.repository.js'

const repository = new LevelingRepository()


//verifies inputs
function sanitizeLevelingInput(req:Request, res:Response, next: NextFunction ) {

    req.body.sanitizedInput = {
        id: req.body.id, //REVISAR!!!!!!!!!!!!!!
        previousLevel: req.body.previousLevel,
        newLevel : req.body.newLevel,
        observation: req.body.observation
    }
      next()

}

//finds all objects in the schema
async function findAll(req: Request, res: Response) {
    res.json({ data: await repository.findAll() })
}

//finds an object by id and returns its data
async function findOne(req: Request, res: Response) {
    const id = req.params.id
    const leveling = await repository.findOne({ id })
    if (!leveling) {
      return res.status(404).send({ message: 'Leveling not found' })
    }
    res.json({ data: leveling })
}


//adds an object to the repository 
async function add(req: Request, res: Response) {
   
    const input = req.body.sanitizedInput;
    const leveling = await repository.add(input);
    if (!leveling){
      return res.status(400).send({message: 'Leveling already exist'})
    }
    res.status(201).send({ message: 'Leveling created', data: leveling })
}


//finds an object by id and updates by the req body
async function update(req: Request, res: Response) {
    const input = req.body.sanitizedInput;
    req.body.sanitizedInput.id = req.params.id
    const leveling = await repository.update(input)
    if (!leveling) {
      return res.status(404).send({ message: 'Leveling not found' })
    }
    return res.status(200).send({ message: 'Leveling updated successfully', data: leveling })
}

//finds an object by id and deletes it
async function remove(req: Request, res: Response) {
    const id = req.params.id
    const leveling = await repository.remove({ id })
  
    if (!leveling) {
      return res.status(404).send({ message: 'Leveling not found'})
    }
      res.status(200).send({ message: 'Leveling deleted successfully'})
  }
  
  export { sanitizeLevelingInput, findAll, findOne, add, update, remove }