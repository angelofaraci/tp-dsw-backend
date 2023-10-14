import { Request, Response, NextFunction } from 'express'
import { InteractionRepository } from './interaction.repository.js'

const repository = new InteractionRepository()


//verifies inputs
function sanitizeInteractionInput(req:Request, res:Response, next: NextFunction ) {

    req.body.sanitizedInput = {
        id: req.body.id, //REVISAR!!!!!!!!!!!!!!
        state : req.body.state,
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
    const interaction = await repository.findOne({ id })
    if (!interaction) {
      return res.status(404).send({ message: 'Interaction not found' })
    }
    res.json({ data: interaction })
}


//adds an object to the repository 
async function add(req: Request, res: Response) {
   
    const input = req.body.sanitizedInput;
    const interaction = await repository.add(input);
    if (!interaction){
      return res.status(400).send({message: 'Interaction already exist'})
    }
    res.status(201).send({ message: 'Interaction created', data: interaction })
}


//finds an object by id and updates by the req body
async function update(req: Request, res: Response) {
    const input = req.body.sanitizedInput;
    req.body.sanitizedInput.id = req.params.id
    const interaction = await repository.update(input)
    if (!interaction) {
      return res.status(404).send({ message: 'Interaction not found' })
    }
    return res.status(200).send({ message: 'Interaction updated successfully', data: interaction })
}

//finds an object by id and deletes it
async function remove(req: Request, res: Response) {
    const id = req.params.id
    const interaction = await repository.remove({ id })
  
    if (!interaction) {
      return res.status(404).send({ message: 'Interaction not found'})
    }
      res.status(200).send({ message: 'Interaction deleted successfully'})
  }
  
  export { sanitizeInteractionInput, findAll, findOne, add, update, remove }