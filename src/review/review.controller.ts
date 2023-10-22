import { Request, Response, NextFunction } from 'express'
import { ReviewRepository } from './review.repository.js'
import { User, UserModel } from '../user/user.entity.js'

const repository = new ReviewRepository()


//verifies inputs
function sanitizeReviewInput(req:Request, res:Response, next: NextFunction ) {

    req.body.sanitizedInput = {
        id: req.body.id, //REVISAR!!!!!!!!!!!!!!
        rating: req.body.rating,
        body : req.body.body,
        spoiler_check : req.body.spoiler_check,
        state: req.body.state,
        userId: req.body.userId,
        gameId: req.body.gameId
    }
      next()

}

async function checkIfReviewed(req: Request, res:Response){

  const userId = req.body.userId
  const gameId = req.body.gameId
  const reviewed = await repository.checkIfReviewed(userId, gameId)
  return res.status(200).json({isReviewed: reviewed})
}

//finds all objects in the schema
async function findAll(req: Request, res: Response) {
    res.json({ data: await repository.findAll() })
}


//finds all reviews for a game
async function findAllForGame(req: Request, res: Response){
  const gameId = req.body.gameId
  const reviews = await repository.findAllForGame(gameId)
  res.status(200).json(reviews)
}

//finds an object by id and returns its data
async function findOne(req: Request, res: Response) {
    const id = req.params.id
    const review = await repository.findOne({ id })
    if (!review) {
      return res.status(404).send({ message: 'Review not found' })
    }
    res.json({ data: review })
}


//adds an object to the repository 
async function add(req: Request, res: Response) {
   
    const input = req.body.sanitizedInput;
    const review = await repository.add(input);
    if (!review){
      return res.status(400).send({message: 'Review already exist'})
    }
    res.status(201).send({ message: 'Review created', data: review })
}


//finds an object by id and updates by the req body
async function update(req: Request, res: Response) {
    const input = req.body.sanitizedInput;
    req.body.sanitizedInput.id = req.params.id
    const review = await repository.update(input)
    if (!review) {
      return res.status(404).send({ message: 'Review not found' })
    }
    return res.status(200).send({ message: 'Review updated successfully', data: review })
}

async function calculateScore(req: Request, res:Response, next:NextFunction){

const gameId = req.body.gameId
await repository.calculateScore(gameId)
next()
}

//finds an object by id and deletes it
async function remove(req: Request, res: Response) {
    const id = req.params.id
    const review = await repository.remove({ id })
  
    if (!review) {
      return res.status(404).send({ message: 'Review not found'})
    }
      res.status(200).send({ message: 'Review deleted successfully'})
  }
  
  export { calculateScore, sanitizeReviewInput, findAll, findOne, add, update, remove, checkIfReviewed, findAllForGame }