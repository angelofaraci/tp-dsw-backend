import { CompanyModel, Company } from "./company.entity.js";


export class CompanyRepository{
   public async findAll(): Promise< Company[] | undefined> {
      return await CompanyModel.find()
   }
   
//searchs by id and returns one object
   public async findOne(item: Partial<Company> ): Promise < Company | undefined> {
      return await CompanyModel.findOne({id: item.id}) || undefined
   }

//adds an object to the db
   public async add(item: Company): Promise < Company | undefined> {
    const newCompany = new CompanyModel(item)
      if (await CompanyModel.findOne({id: newCompany.id})) {return undefined}
    await newCompany.save()
    return item
   }


//searchs an object and updates it
   public async update(item: Company): Promise <Company | undefined> {
      const result = await CompanyModel.findOneAndUpdate(item) 
      return result || undefined
   }


//searchs an object and deletes it
   public async delete(item: Partial<Company>): Promise <Company  | undefined> {
      return await CompanyModel.findOneAndDelete(item) || undefined
   }
}