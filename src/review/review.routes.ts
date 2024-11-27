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
