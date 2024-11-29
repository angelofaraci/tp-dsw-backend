import { Router } from 'express';
import { sanitizeGameInput, findAll, findOne, findCantByDate, findCantByRating, add, update, remove } from './game.controller.js';

export const gameRouter = Router();

gameRouter.get('/', findAll);
/**
 * @swagger
 * /api/games:
 *   get:
 *     summary: Get all games
 *     tags: [Game]
 *     responses:
 *       200:
 *         description: A list of games
 */
gameRouter.get('/:id', findOne);
/**
 * @swagger
 * /api/games/{id}:
 *   get:
 *     summary: Get a game by ID
 *     tags: [Game]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The game ID
 *     responses:
 *       200:
 *         description: A single game
 */
gameRouter.get('/date/:cant', findCantByDate);
/**
 * @swagger
 * /api/games/date/{cant}:
 *   get:
 *     summary: Get a certain number of games by date
 *     tags: [Game]
 *     parameters:
 *       - in: path
 *         name: cant
 *         required: true
 *         schema:
 *           type: number
 *         description: The number of games to retrieve
 *     responses:
 *       200:
 *         description: A list of games by date
 */
gameRouter.get('/rating/:cant', findCantByRating);
/**
 * @swagger
 * /api/games/rating/{cant}:
 *   get:
 *     summary: Get a certain number of games by rating
 *     tags: [Game]
 *     parameters:
 *       - in: path
 *         name: cant
 *         required: true
 *         schema:
 *           type: number
 *         description: The number of games to retrieve
 *     responses:
 *       200:
 *         description: A list of games by rating
 */
gameRouter.post('/', sanitizeGameInput, add);
/**
 * @swagger
 * /api/games:
 *   post:
 *     summary: Add a new game
 *     tags: [Game]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               release_date:
 *                 type: date
 *     responses:
 *       201:
 *         description: Game created
 */
gameRouter.put('/:id', sanitizeGameInput, update);
/**
 * @swagger
 * /api/games/{id}:
 *   put:
 *     summary: Update a game
 *     tags: [Game]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The game ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               releaseDate:
 *                 type: string
 *               rating:
 *                 type: number
 *     responses:
 *       200:
 *         description: Game updated
 */
gameRouter.delete('/:id', remove);
/**
 * @swagger
 * /api/games/{id}:
 *   delete:
 *     summary: Delete a game
 *     tags: [Game]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The game ID
 *     responses:
 *       200:
 *         description: Game deleted
 */