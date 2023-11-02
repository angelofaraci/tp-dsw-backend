import { Request, Response, NextFunction } from 'express';
import { Company, CompanyModel } from './company.entity.js';

const repository = CompanyModel;


//verifies inputs
function sanitizeCompanyInput(req:Request, res:Response, next: NextFunction ) {
    req.body.sanitizedInput = {
        id: req.body.id, //REVISAR!!!!!!!!!!!!!!
        name : req.body.name,
        website: req.body.website,
        socials: req.body.socials,
    };
    next();

};

//finds all objects in the schema
async function  findAll(req: Request, res: Response) {
    res.json({ data: await repository.find() });
};


//finds an object by id and returns its data
async function findOne(req: Request, res: Response) {
    const id = req.params.id;
    const company = await repository.findOne({id:id});
    if (!company) {
      return res.status(404).send({ message: 'Company not found' });
    };
    return res.status(200).json({ message:'Company found', data: company });
};

//adds an object to the repository 
async function add(req: Request, res: Response) {
    const input = req.body.sanitizedInput;
    const company = await repository.findOne({id:input.id});
    if (company) {
      return res.status(400).send({ message: 'Company already exists' });
    };
    const newCompany = new repository(input);
    newCompany.save();
    return res.status(201).send({ message: 'Company created', data: newCompany });
};


//finds an object by id and updates by the req body
async function update(req: Request, res: Response) {
    req.body.sanitizedInput.id = req.params.id;
    const input = req.body.sanitizedInput;
    const company = await repository.findOneAndUpdate({id:input.id},input);
    if (!company) {
      return res.status(404).send({ message: 'Company not found' });
    };
    return res.status(200).send({ message: 'Company updated successfully', data: company });
};


//finds an object by id and deletes it
async function remove(req: Request, res: Response) {
  const id = req.params.id;
  const company = await repository.findOneAndDelete({id:id});
  if (!company) {
    return res.status(404).send({ message: 'Company not found' });
  };
    return res.status(200).send({ message: 'Company deleted successfully' });
  };
  
  export { sanitizeCompanyInput, findAll, findOne, add, update, remove };