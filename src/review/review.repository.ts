import { Review, ReviewClass } from "./review.entity.js"

export class ReviewRepository {
   public async findAll(): Promise<ReviewClass[] | undefined> {
      return await Review.find()
   }
   
   public async findOne(item: Partial<ReviewClass> ): Promise< ReviewClass | undefined> {
      return await Review.findOne({id: item.id}) || undefined
   }

   public async add(item:ReviewClass): Promise < ReviewClass | undefined> {
      const newReview = new Review(item)
      if (await Review.findOne({id: item.id})){
         return undefined
      }
      await newReview.save()
      return item
   }
   public async update(item: ReviewClass): Promise < ReviewClass | undefined > {
      const result = await Review.findOneAndUpdate(item)
      return result || undefined
   }

   public async remove(item:Partial<ReviewClass>): Promise< ReviewClass | undefined>{
      return await Review.findOneAndDelete(item) || undefined
   }
}



