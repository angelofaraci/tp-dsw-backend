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
/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 */
userRouter.post("/login", sanitizeUserInput, getOne);
/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: User login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in
 */
userRouter.get("/profile", verifyToken, getUserData);
/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User profile data
 */
userRouter.get("/user/:username", getOneUserPublicData);
/**
 * @swagger
 * /api/user/user/{username}:
 *   get:
 *     summary: Get public data of a user by username
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: The username
 *     responses:
 *       200:
 *         description: Public data of a user
 */
userRouter.get("/getall", getAllUsersPublicData)
/**
 * @swagger
 * /api/user/getall:
 *   get:
 *     summary: Get public data of all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Public data of all users
 */
userRouter.put("/levelUp/:action", sanitizeUserInput, changeLevel);
/**
 * @swagger
 * /api/user/levelUp/{action}:
 *   put:
 *     summary: Change user level
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: action
 *         required: true
 *         schema:
 *           type: string
 *         description: The action to perform
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               level:
 *                 type: number
 *     responses:
 *       200:
 *         description: User level changed
 */
userRouter.put("/update", sanitizeUserInput, verifyToken, changeUsername);
/**
 * @swagger
 * /api/user/update:
 *   put:
 *     summary: Update username
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: Username updated
 */
userRouter.delete("/delete/:id", deleteUser);
/**
 * @swagger
 * /api/user/delete/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted
 */
userRouter.delete("/deleteThis",verifyToken, deleteThisUser);
/**
 * @swagger
 * /api/user/deleteThis:
 *   delete:
 *     summary: Delete the authenticated user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User deleted
 */