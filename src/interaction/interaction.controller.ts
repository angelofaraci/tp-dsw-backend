import { Request, Response, NextFunction } from 'express'
import { InteractionModel, Interaction } from "./interaction.entity.js"

const repository = InteractionModel;


//verifies inputs
function sanitizeInteractionInput(req:Request, res:Response, next: NextFunction ) {

    req.body.sanitizedInput = {
        id: req.body.id, //REVISAR!!!!!!!!!!!!!!
        state : req.body.state,
    };
      next()

};

//finds all objects in the schema
async function findAll(req: Request, res: Response) {
    res.status(200).json({ data: await repository.find() })
};

//finds an object by id and returns its data
async function findOne(req: Request, res: Response) {
    const id = req.params.id;
    const interaction = await repository.findOne({ id:id });
    if (!interaction) {
      return res.status(404).send({ message: 'Interaction not found' })
    }
    return res.status(200).json({ data: interaction })
};


//adds an object to the repository 
async function add(req: Request, res: Response) {
   
    const input = req.body.sanitizedInput;
    const interaction = await repository.findOne({id:input.id});
    const newInteraction = new repository(input);
    if (interaction){
      return res.status(400).send({message: 'Interaction already exist'})
    }
    newInteraction.save();
    return res.status(201).send({ message: 'Interaction created', data: newInteraction })
}


//finds an object by id and updates by the req body
async function update(req: Request, res: Response) {
  req.body.sanitizedInput.id = req.params.id;
  const input = req.body.sanitizedInput;
  const interaction = await repository.findOneAndUpdate({id:input.id}, input);
  if (!interaction) {
    return res.status(404).send({ message: 'Interaction not found' })
  };
  return res.status(200).send({ message: 'Interaction updated successfully', data: interaction })
};

//finds an object by id and deletes it
async function remove(req: Request, res: Response) {
    const id = req.params.id;
    const interaction = await repository.findOneAndDelete({ id:id });
    if (!interaction) {
      return res.status(404).send({ message: 'Interaction not found'})
    };
      return res.status(200).send({ message: 'Interaction deleted successfully'})
  };
  
  export { sanitizeInteractionInput, findAll, findOne, add, update, remove };