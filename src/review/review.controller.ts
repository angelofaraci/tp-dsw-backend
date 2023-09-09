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
        state: req.body.state
    }
}
