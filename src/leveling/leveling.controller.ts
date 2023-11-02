import { Request, Response, NextFunction } from 'express'
import { LevelingModel , Leveling} from "./leveling.entity.js"

const repository = LevelingModel;


//verifies inputs
function sanitizeLevelingInput(req:Request, res:Response, next: NextFunction ) {

    req.body.sanitizedInput = {
        id: req.body.id, //REVISAR!!!!!!!!!!!!!!
        previousLevel: req.body.previousLevel,
        newLevel : req.body.newLevel,
        observation: req.body.observation,
        userId: req.body.userId,
        adminId: req.body.adminId
    }
      next()

};

//finds all objects in the schema
async function findAll(req: Request, res: Response) {
    res.json({ data: await repository.find() })
};

//finds an object by id and returns its data
async function findOne(req: Request, res: Response) {
    const id = req.params.id;
    const leveling = await repository.findOne({ id:id }) || undefined;
    if (!leveling) {
      return res.status(404).send({ message: 'Leveling not found' })
    }
    return res.json({ data: leveling })
};


//adds an object to the repository 
async function add(req: Request, res: Response) {
   
    const input = req.body.sanitizedInput;
    const leveling = await repository.findOne({id: input.id});
    const newLeveling = new repository(input);
      if (leveling){
        return res.status(400).send({message: 'Leveling already exist'})
      }
      await newLeveling.save();
      return res.status(201).send({ message: 'Leveling created', data: newLeveling })   
};


//finds an object by id and updates by the req body
async function update(req: Request, res: Response) {
  const input = req.body.sanitizedInput;
  const id =  req.params.id;
  const leveling = await repository.findOneAndUpdate({id:id},input);
  if (!leveling) {
    return res.status(404).send({ message: 'Leveling not found' })
  }
  return res.status(200).send({ message: 'Leveling updated successfully', data: leveling })
};

//finds an object by id and deletes it
async function remove(req: Request, res: Response) {
    const id = req.params.id;
    const leveling = await repository.findOneAndDelete({id:id});
    if (!leveling) {
      return res.status(404).send({ message: 'Leveling not found'})
    }
      return res.status(200).send({ message: 'Leveling deleted successfully'})
  };
  
  export { sanitizeLevelingInput, findAll, findOne, add, update, remove };