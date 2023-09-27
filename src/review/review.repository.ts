import { ReviewModel, Review } from "./review.entity.js"



export class ReviewRepository {
   public async findAll(): Promise<Review[] | undefined> {
      return await ReviewModel.find()
   }
   
//searchs by id and returns one object
   public async findOne(item: Partial<Review> ): Promise< Review | undefined> {
      return await ReviewModel.findOne({id: item.id}) || undefined
   }


//adds an object to the db
   public async add(item:Review): Promise < Review | undefined> {
      const newReview = new ReviewModel(item)
      if (await ReviewModel.findOne({id: item.id})){
         return undefined
      }
      await newReview.save()
      return item
   }

//searchs an object and updates it
   public async update(item: Review): Promise < Review | undefined > {
      const result = await ReviewModel.findOneAndUpdate(item)
      return result || undefined
   }


//searchs an object and deletes it
   public async remove(item:Partial<Review>): Promise< Review | undefined>{
      return await ReviewModel.findOneAndDelete(item) || undefined
   }
}



