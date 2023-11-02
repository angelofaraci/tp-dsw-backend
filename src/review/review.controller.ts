import { Request, Response, NextFunction } from 'express';
import { ReviewModel, Review } from "./review.entity.js";
import { GameModel } from "../game/game.entity.js";
import { Types } from 'mongoose';

const repository = ReviewModel;


//verifies inputs
function sanitizeReviewInput(req:Request, res:Response, next: NextFunction ) {

    req.body.sanitizedInput = {
        id: req.body._id, //REVISAR!!!!!!!!!!!!!!
        rating: req.body.rating,
        body : req.body.body,
        spoiler_check : req.body.spoiler_check,
        state: req.body.state,
        userId: req.body.userId,
        gameId: req.body.gameId
    }
      next()

};

async function checkIfReviewed(req: Request, res:Response){

  const userId = new Types.ObjectId(req.body.userId);
  const gameId = new Types.ObjectId(req.body.gameId);
  const reviewed = await ReviewModel.findOne({ $and: [{ userId: userId }, { gameId: gameId }] }) || undefined;
  
  return res.status(200).json({isReviewed: reviewed})
};

//finds all objects in the schema
async function findAll(req: Request, res: Response) {
  return res.json({ data: await repository.find() })
};


//finds all reviews for a game
async function findAllForGame(req: Request, res: Response){
  const gameId:Types.ObjectId = new Types.ObjectId(req.body.gameId);
  const reviews= await repository.find({ gameId: gameId }).populate('userId');
  return res.status(200).json(reviews)
};

//finds an object by id and returns its data
async function findOne(req: Request, res: Response) {
    const id = req.params.id;
    const review = await ReviewModel.findOne({id: id}).populate('userId') || undefined;
    if (!review) {
      return res.status(404).send({ message: 'Review not found' })
    };
    return res.status(200).json({ data: review })
}


//adds an object to the repository 
async function add(req: Request, res: Response) {
   
    const input = req.body.sanitizedInput;
    const newReview = new repository(input);
    const review = await repository.findById(input.id);
    if (review){
      return res.status(400).send({message: 'Review already exist'})
    };
    await newReview.save();
    return res.status(201).send({ message: 'Review created', data: newReview })
};


//finds an object by id and updates by the req body
async function update(req: Request, res: Response) {
    const input = req.body.review;
    const userId = new Types.ObjectId(req.body.userId);
    const gameId = new Types.ObjectId(req.body.gameId);
    const review = await repository.findOneAndUpdate({userId: userId, gameId: gameId}, input);
    if (!review) {
      return res.status(404).send({ message: 'Review not found' })
    };
    return res.status(200).send({ message: 'Review updated successfully', data: review })
};

async function calculateScore(req: Request, res:Response, next:NextFunction){

  const gameId = new Types.ObjectId(req.body.gameId);
  const gameReviews: any = await ReviewModel.find({ gameId: gameId }) || undefined;
  let scoreAcum = 0;
    for(let i=0; i<gameReviews.length; i++){
        scoreAcum = scoreAcum + gameReviews[i].rating;
    };
  const calculatedRating = scoreAcum / gameReviews.length;
  const calculatedRatingRounded = Math.round(calculatedRating);
  const game: any = await GameModel.findById(gameId) || undefined;
  game.rating = calculatedRatingRounded;
  const result = await GameModel.findByIdAndUpdate(gameId, game) || undefined;

next()
};

//finds an object by id and deletes it
async function remove(req: Request, res: Response) {
    const id = req.params.id;
    const review = await repository.findOneAndDelete(new Types.ObjectId(id)) || undefined;
    if (!review) {
      return res.status(404).send({ message: 'Review not found'})
    }
      return res.status(200).send({ message: 'Review deleted successfully'})
  };
  
  export { calculateScore, sanitizeReviewInput, findAll, findOne, add, update, remove, checkIfReviewed, findAllForGame };