import { Router } from "express";
import {
  sanitizeReviewInput,
  findAll,
  findOne,
  add,
  update,
  remove,
  checkIfReviewed,
  findAllForGame,
  findAllForUser,
  calculateScore,
  updateLikes,
  verifyToken,
} from "./review.controller.js";

export const reviewRouter = Router();

reviewRouter.get("/", findAll);
reviewRouter.get("/:id", findOne);
reviewRouter.post("/", sanitizeReviewInput, add);
reviewRouter.put("/:id", verifyToken ,update);
reviewRouter.delete("/:id",verifyToken ,remove);
reviewRouter.post("/check", checkIfReviewed);
reviewRouter.post("/getreviews/game", calculateScore, findAllForGame);
reviewRouter.post("/getreviews/user", findAllForUser);
reviewRouter.post("/:reviewId/:action/:userId", updateLikes);
/**
 * @swagger
 * /api/reviews/{reviewId}/{action}/{userId}:
 *   post:
 *     summary: Update likes for a review
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *         description: The review ID
 *       - in: path
 *         name: action
 *         required: true
 *         schema:
 *           type: string
 *         description: The action to perform
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Likes updated
 */
