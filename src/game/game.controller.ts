import { Request, Response, NextFunction } from 'express';
import { GameModel, Game } from "./game.entity.js";
import { ReviewModel } from '../review/review.entity.js';
import { Types } from 'mongoose';

const repository = GameModel;


//verifies inputs
function sanitizeReviewInput(req:Request, res:Response, next: NextFunction ) {
    req.body.sanitizedInput = {
        id: req.body.id, //REVISAR!!!!!!!!!!!!!!
        name : req.body.name,
        description : req.body.description,
        cover : req.body.cover,
        release_date: req.body.release_date,
        website: req.body.website,
        socials: req.body.socials,
        rating: req.body.rating
    };
    
      next()

};

//finds all objects in the schema
async function  findAll(req: Request, res: Response) {
  res.status(200).json({ data: await repository.find() })
};


//finds an object by id and returns its data
async function findOne(req: Request, res: Response) {
    const id = req.params.id;
    const game = await repository.findOne({id:id});
    if (!game) {
      return res.status(404).send({ message: 'Game not found' })
    };
    return res.status(200).json({ data: game })
};

//adds an object to the repository 
async function add(req: Request, res: Response) {
    const input = req.body.sanitizedInput;
    const game = await repository.findOne({id:input.id});
    if (game) {
      return res.status(400).send({ message: 'Game already exists' })
    }
    const newGame = new repository(input);
    newGame.save();
    return res.status(201).send({ message: 'Game created', data: newGame })
}


//finds an object by id and updates by the req body
async function update(req: Request, res: Response) {
    req.body.sanitizedInput.id = req.params.id;
    const input = req.body.sanitizedInput;
    const game = await repository.findOneAndUpdate({id: input.id}, input);
    if (!game) {
      return res.status(404).send({ message: 'Game not found' })
    };
    return res.status(200).send({ message: 'Game updated successfully', data: game })
};


//finds an object by id and deletes it
async function remove(req: Request, res: Response) {
  const id: Types.ObjectId = new Types.ObjectId(req.params.id);
  await ReviewModel.deleteMany({gameId: id});
  const game = await repository.findByIdAndDelete(id);
  if (game) {
    return res.status(204).send({ message: 'Game deleted successfully' })
  };
  return res.status(401).send('Something went wrong')
    
  };
  export { sanitizeReviewInput, findAll, findOne, add, update, remove };