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
/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Review]
 *     responses:
 *       200:
 *         description: A list of reviews for
 */
reviewRouter.get("/:id", findOne);
/**
 * @swagger
 * /api/reviews/{id}:
 *   get:
 *     summary: Get a review by ID
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The review ID
 *     responses:
 *       200:
 *         description: A single review
 */
reviewRouter.post("/", sanitizeReviewInput, add);
/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Add a new review
 *     tags: [Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *               rating:
 *                 type: number
 *     responses:
 *       201:
 *         description: Review created
 */
reviewRouter.put("/:id", verifyToken ,update);
/**
 * @swagger
 * /api/reviews/{id}:
 *   put:
 *     summary: Update a review
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The review ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *               rating:
 *                 type: number
 *     responses:
 *       200:
 *         description: Review updated
 */
reviewRouter.delete("/:id",verifyToken ,remove);
/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The review ID
 *     responses:
 *       200:
 *         description: Review deleted
 */
reviewRouter.post("/check", checkIfReviewed);
/**
 * @swagger
 * /api/reviews/check:
 *   post:
 *     summary: Check if a review exists
 *     tags: [Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reviewId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review checked
 */
reviewRouter.post("/getreviews/game", calculateScore, findAllForGame);
/**
 * @swagger
 * /api/reviews/getreviews/game:
 *   post:
 *     summary: Get reviews for a game
 *     tags: [Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gameId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reviews for a game
 */
reviewRouter.post("/getreviews/user", findAllForUser);
/**
 * @swagger
 * /api/reviews/getreviews/user:
 *   post:
 *     summary: Get reviews for a user
 *     tags: [Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reviews for a user
 */
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
