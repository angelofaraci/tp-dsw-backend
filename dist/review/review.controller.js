import { ReviewRepository } from './review.repository.js';
import { Review } from './review.entity.js';
const repository = new ReviewRepository();
function sanitizeReviewInput(req, res, next) {
    req.body.sanitizedInput = {
        rating: req.body.rating,
        body: req.body.body,
        spoiler_check: req.body.spoiler_check,
        redaction_date: req.body.redaction_date,
        edition_date: req.body.edition_date,
        state: req.body.state,
        id: req.body.id //REVISAR!!!!!!!!!!!!!!
    };
    // Object.keys(req.body.sanitizedInput).forEach((key) => {           ESTO SE USA
    //     if (req.body.sanitizedInput[key] === undefined) {             PARA EL PATCH
    //       delete req.body.sanitizedInput[key]
    //     }
    //   })
    next();
}
function findAll(req, res) {
    res.json({ data: repository.findAll() });
}
function findOne(req, res) {
    const id = req.params.id;
    const review = repository.findOne({ id });
    if (!review) {
        return res.status(404).send({ message: 'Review not found' });
    }
    res.json({ data: review });
}
function add(req, res) {
    const input = req.body.sanitizedInput;
    const reviewInput = new Review(input.rating, input.body, input.spoiler_check, input.redaction_date, input.edition_date, input.state, input.id //REVISAR!!!!!!!!!!!! 
    );
    const review = repository.add(reviewInput);
    return res.status(201).send({ message: 'Review created', data: review });
}
function update(req, res) {
    req.body.sanitizedInput.id = req.params.id;
    const review = repository.update(req.body.sanitizedInput);
    if (!review) {
        return res.status(404).send({ message: 'Review not found' });
    }
    return res.status(200).send({ message: 'Review updated successfully', data: review });
}
function remove(req, res) {
    const id = req.params.id;
    const review = repository.delete({ id });
    if (!review) {
        res.status(404).send({ message: 'Review not found' });
    }
    else {
        res.status(200).send({ message: 'Review deleted successfully' });
    }
}
export { sanitizeReviewInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=review.controller.js.map