import { Request, Response, NextFunction } from 'express'
import { GameRepository } from './game.repository.js'
import { Game } from './game.entity.js'

const repository = new GameRepository()

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
    }
    
      next()

}


async function  findAll(req: Request, res: Response) {
    res.json({ data: await repository.findAll() })
}


async function findOne(req: Request, res: Response) {
    const id = req.params.id
    const game = await repository.findOne({id})
    if (!game) {
      return res.status(404).send({ message: 'Game not found' })
    }
    res.json({ data: game })
}

async function add(req: Request, res: Response) {
    const input = req.body.sanitizedInput
    const game = await repository.add(input)
    if (!game) {
      return res.status(400).send({message: 'Game already exists'})
    }
    return res.status(201).send({ message: 'Game created', data: game })
}

async function update(req: Request, res: Response) {
    req.body.sanitizedInput.id = req.params.id
    const game = await repository.update(req.body.sanitizedInput)
  
    if (!game) {
      return res.status(404).send({ message: 'Game not found' })
    }
  
    return res.status(200).send({ message: 'Game updated successfully', data: game })
}

async function remove(req: Request, res: Response) {
    const id = req.params.id
    const game = await repository.delete({id})
  
    if (!game) {
      res.status(404).send({ message: 'Game not found' })
    } else {
      res.status(200).send({ message: 'Game deleted successfully' })
    }
  }
  
  export { sanitizeReviewInput, findAll, findOne, add, update, remove }