import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';
import { AdminRepository } from './admin.repository.js';

const repository = new AdminRepository


//verifies inputs

function sanitizeAdminInput(req:Request, res:Response, next: NextFunction ) {
    req.body.sanitizedInput = {
        id: req.body.id, //REVISAR!!!!!!!!!!!!!!
        username : req.body.username,
        email : req.body.email,
        password: req.body.password,
    }
    
      next()

}

//adds an object to the repository 

async function add (req: Request, res: Response, next: NextFunction) {
 
    const input = req.body.sanitizedInput
    const token = await repository.add(input)
    if(!token){
        return res.status(400).send({message: "Admin already exists"})
    }
    res.status(201).json({token})
}


async function getOne(req: Request, res: Response){

    const email = req.body.email
    const password  = req.body.password
    const token = await repository.getOne(email, password)
    if ( token === 'Wrong Email' || token === 'Wrong Password') {
        const error = token
        return res.status(401).send({error})
    }
    else {res.status(200).json({token})}
}



//sends an _id to the repository and returns the correspondent JSON object

async function getAdminData(req:Request, res:Response, next: NextFunction){
    const adminData = await repository.recoverOne(res.locals.adminId)
    res.locals.admin = adminData
    return res.status(200).json({adminData})
    next()
}

//verifies token validity

 function verifyToken(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    const token = req.headers.authorization.split(' ')[1]
    if (token === null){
        return res.status(401).send('Unauthorized request')
    }

    const payload: any = jwt.verify(token, 'secretKey')
    res.locals.adminId = payload._id
   
    next()
}

//finds an object by id and updates by the req body
async function update(req: Request, res: Response) {
    const input = req.body.sanitizedInput;
    req.body.sanitizedInput.id = req.params.id
    const admin = await repository.update(input)
    if (!admin) {
      return res.status(404).send({ message: 'Admin not found' })
    }
    return res.status(200).send({ message: 'Admin updated successfully', data: admin })
}

//finds an object by id and deletes it
async function remove(req: Request, res: Response) {
    const id = req.params.id
    const Admin = await repository.remove({ id })
  
    if (!Admin) {
      return res.status(404).send({ message: 'Admin not found'})
    }
      res.status(200).send({ message: 'Admin deleted successfully'})
  }
export { sanitizeAdminInput, add, getOne, verifyToken, getAdminData, update, remove}

