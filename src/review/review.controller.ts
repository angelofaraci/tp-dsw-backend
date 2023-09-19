import { Request, Response, NextFunction } from 'express'
import { ReviewRepository } from './review.repository.js'
import { Review } from './review.entity.js'

const repository = new ReviewRepository()

function sanitizeReviewInput(req:Request, res:Response, next: NextFunction ) {
    req.body.sanitizedInput = {
        id: req.body.id, //REVISAR!!!!!!!!!!!!!!
        rating: req.body.rating,
        body : req.body.body,
        spoiler_check : req.body.spoiler_check,
        state: req.body.state,
    }
      next()

}


async function findAll(req: Request, res: Response) {
    res.json({ data: await repository.findAll() })
}


async function findOne(req: Request, res: Response) {
    const id = req.params.id
    const review = await repository.findOne({ id })
    if (!review) {
      return res.status(404).send({ message: 'Review not found' })
    }
    res.json({ data: review })
}

async function add(req: Request, res: Response) {
    const input = req.body.sanitizedInput;
    const review = await repository.add(input);
    if (!review){
      return res.status(418).send({message: 'Review already exist'})
    }
    res.status(201).send({ message: 'Review created', data: review })
}

async function update(req: Request, res: Response) {
    const input = req.body.sanitizedInput;
    req.body.sanitizedInput.id = req.params.id
    const review = await repository.update(input)
  
    if (!review) {
      return res.status(404).send({ message: 'Review not found' })
    }
  
    return res.status(200).send({ message: 'Review updated successfully', data: review })
}
async function remove(req: Request, res: Response) {
    const id = req.params.id
    const review = await repository.remove({ id })
  
    if (!review) {
      return res.status(404).send({ message: 'Review not found'})
    }
      res.status(200).send({ message: 'Review deleted successfully'})
  }
  
  export { sanitizeReviewInput, findAll, findOne, add, update, remove }