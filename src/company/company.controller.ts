import { Request, Response, NextFunction } from 'express'
import { CompanyRepository } from './company.repository.js'
import { Company } from './company.entity.js'

const repository = new CompanyRepository()


//verifies inputs
function sanitizeReviewInput(req:Request, res:Response, next: NextFunction ) {
    req.body.sanitizedInput = {
        id: req.body.id, //REVISAR!!!!!!!!!!!!!!
        name : req.body.name,
        website: req.body.website,
        socials: req.body.socials,
    }
    
      next()

}

//finds all objects in the schema
async function  findAll(req: Request, res: Response) {
    res.json({ data: await repository.findAll() })
}


//finds an object by id and returns its data
async function findOne(req: Request, res: Response) {
    const id = req.params.id
    const company = await repository.findOne({id})
    if (!company) {
      return res.status(404).send({ message: 'Company not found' })
    }
    res.json({ data: company })
}

//adds an object to the repository 
async function add(req: Request, res: Response) {
    const input = req.body.sanitizedInput
    const company = await repository.add(input)
    if (!company) {
      return res.status(400).send({message: 'Company already exists'})
    }
    return res.status(201).send({ message: 'Company created', data: company })
}


//finds an object by id and updates by the req body
async function update(req: Request, res: Response) {
    req.body.sanitizedInput.id = req.params.id
    const company = await repository.update(req.body.sanitizedInput)
  
    if (!company) {
      return res.status(404).send({ message: 'Company not found' })
    }
  
    return res.status(200).send({ message: 'Company updated successfully', data: company })
}


//finds an object by id and deletes it
async function remove(req: Request, res: Response) {
    const id = req.params.id
    const company = await repository.delete({id})
  
    if (!company) {
      res.status(404).send({ message: 'Company not found' })
    } else {
      res.status(200).send({ message: 'Company deleted successfully' })
    }
  }
  
  export { sanitizeReviewInput, findAll, findOne, add, update, remove }