import { Review } from "./review.entity.js";
const reviews = [
    new Review(83, 'lasjdklaskldj', false, new Date(2023, 0o6, 0o6), null, 'Public', '1')
];
export class ReviewRepository {
    findAll() {
        return reviews;
    }
    findOne(item) {
        return reviews.find((reviews) => reviews.id = item.id);
    }
    add(item) {
        reviews.push(item);
        return item;
    }
    update(item) {
        const reviewIdx = reviews.findIndex((reviews) => reviews.id === item.id);
        if (reviewIdx !== -1) {
            reviews[reviewIdx] = { ...reviews[reviewIdx], ...item };
        }
        return reviews[reviewIdx];
    }
    delete(item) {
        const reviewIdx = reviews.findIndex((reviews) => reviews.id === item.id);
        if (reviewIdx !== -1) {
            const deletedReviews = reviews[reviewIdx];
            reviews.splice(reviewIdx, 1);
            return deletedReviews;
        }
    }
}
//# sourceMappingURL=review.repository.js.map