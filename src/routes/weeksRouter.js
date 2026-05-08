import { Router } from 'express';

import { authenticate } from '../middleware/authenticate.js';

import { getWeekData } from '../controllers/weeks/getWeekData.js';
import { getPrivateWeekData } from '../controllers/weeks/getPrivateWeekData.js';

import {
  getPublicWeeksController,
  getPrivateWeeksController,
  getBabyStateController,
  getMomStateController,
} from '../controllers/weeks/weeksController.js';

const weeksRouter = Router();

/**
 * @swagger
 * /api/weeks/baby:
 *   get:
 *     summary: Get baby state for current pregnancy week
 *     tags: [Weeks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully found baby state
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Successfully found baby state
 *                 data:
 *                   $ref: '#/components/schemas/BabyState'
 *       400:
 *         description: Bad request (due date missing or invalid)
 *       401:
 *         description: Unauthorized
 */
weeksRouter.get("/baby", authenticate, getBabyStateController);

/**
 * @swagger
 * /api/weeks/mom:
 *   get:
 *     summary: Get mom state for current pregnancy week
 *     tags: [Weeks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully found mom state
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Successfully found mom state
 *                 data:
 *                   $ref: '#/components/schemas/MomState'
 *       400:
 *         description: Bad request (due date missing or invalid)
 *       401:
 *         description: Unauthorized
 */
weeksRouter.get("/mom", authenticate, getBabyStateController);
//main
weeksRouter.get('/', getPublicWeeksController);
weeksRouter.get('/me', authenticate, getPrivateWeeksController);

//маршрути анни
weeksRouter.get('/baby', authenticate, getBabyStateController);
weeksRouter.get('/mom', authenticate, getMomStateController);

//маршрути віталії
weeksRouter.get('/private/:weekNumber', authenticate, getPrivateWeekData);
weeksRouter.get('/:weekNumber', getWeekData);

export default weeksRouter;
