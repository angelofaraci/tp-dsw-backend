import { Router } from "express";
import {
  sanitizeUserInput,
  add,
  getOne,
  verifyToken,
  verifyTokenRole,
  getUserData,
  changeLevel,
  changeUsername,
  deleteUser,
  deleteThisUser,
  getOneUserPublicData,
  getAllUsersPublicData
} from "./user.controller.js";

export const userRouter = Router();

userRouter.post("/signup", sanitizeUserInput, add);
userRouter.post("/login", sanitizeUserInput, getOne);
userRouter.get("/profile", verifyToken, getUserData);
userRouter.get("/user/:username", getOneUserPublicData);
userRouter.get("/getall", getAllUsersPublicData)
userRouter.put("/levelUp/:action", sanitizeUserInput, changeLevel);
userRouter.put("/update", sanitizeUserInput, verifyToken, changeUsername);
userRouter.delete("/delete/:id", deleteUser);
userRouter.delete("/deleteThis",verifyToken, deleteThisUser);
