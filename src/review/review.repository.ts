import { Repository } from "../shared/repository.js";
import { Review } from "./review.entity.js";

const reviews = [
   new Review (
    83,
    'lasjdklaskldj',
    false,
    new Date(2023, 0o6, 0o6),
    null,
    'Public',
    '1' 
    )
];

export class ReviewRepository implements Repository<Review>{
   public findAll(): Review[] | undefined {
      return reviews
   }
   
   public findOne(item: { id: string; }): Review | undefined {
      return reviews.find((reviews) => reviews.id = item.id)
   }

   public add(item: Review): Review | undefined {
      reviews.push(item)
      return item
   }

   public update(item: Review): Review | undefined {
      const reviewIdx = reviews.findIndex((reviews) => reviews.id === item.id)
      if (reviewIdx !== -1) {
         reviews[reviewIdx]={...reviews[reviewIdx], ...item}
      }
      return reviews[reviewIdx]  
   }

   public delete(item: { id: string; }): Review | undefined {
      const reviewIdx = reviews.findIndex((reviews) => reviews.id === item.id)
      if (reviewIdx !== -1) {
         const deletedReviews = reviews[reviewIdx]
         reviews.splice(reviewIdx, 1)
         return deletedReviews
      }
   }
}



