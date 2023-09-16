import { Request, Response, NextFunction } from 'express'
import { ReviewRepository } from './review.repository.js'
import { Review } from './review.entity.js'

const repository = new ReviewRepository()

function sanitizeReviewInput(req:Request, res:Response, next: NextFunction ) {
    req.body.sanitizedInput = {
        rating: req.body.rating,
        body : req.body.body,
        spoiler_check : req.body.spoiler_check,
        redaction_date : req.body.redaction_date,
        edition_date: req.body.edition_date,
        state: req.body.state,
        id: req.body.id //REVISAR!!!!!!!!!!!!!!
    }
      next()

}


function findAll(req: Request, res: Response) {
    res.json({ data: repository.findAll() })
}


function findOne(req: Request, res: Response) {
    const id = req.params.id
    const review = repository.findOne({ id })
    if (!review) {
      return res.status(404).send({ message: 'Review not found' })
    }
    res.json({ data: review })
}

function add(req: Request, res: Response) {
    const input = req.body.sanitizedInput
  
    const reviewInput = new Review(
      input.rating,
      input.body,
      input.spoiler_check,
      input.redaction_date,
      input.edition_date,
      input.state,
      input.id //REVISAR!!!!!!!!!!!! 
    )
  
    const review = repository.add(reviewInput)
    return res.status(201).send({ message: 'Review created', data: review })
}

function update(req: Request, res: Response) {
    req.body.sanitizedInput.id = req.params.id
    const review = repository.update(req.body.sanitizedInput)
  
    if (!review) {
      return res.status(404).send({ message: 'Review not found' })
    }
  
    return res.status(200).send({ message: 'Review updated successfully', data: review })
}

function remove(req: Request, res: Response) {
    const id = req.params.id
    const review = repository.delete({ id })
  
    if (!review) {
      res.status(404).send({ message: 'Review not found' })
    } else {
      res.status(200).send({ message: 'Review deleted successfully' })
    }
  }
  
  export { sanitizeReviewInput, findAll, findOne, add, update, remove }