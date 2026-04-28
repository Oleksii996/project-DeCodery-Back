import { Router } from "express";
import { updateUserAvatar } from "../controllers/users/usersController.js";
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/upload.js';

const usersRouter = Router();

/**
 * @swagger
 * /api/users/me/avatar:
 *   patch:
 *     summary: Update user avatar
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   example: https://cloudinary.com/v1_1/demo/image/upload/v1571218039/sample.jpg
 *       400:
 *         description: Bad request (no file provided)
 *       401:
 *         description: Unauthorized
 */
usersRouter.patch(
    '/me/avatar',
    authenticate,
    upload.single('avatar'),
    updateUserAvatar,
  );

export default usersRouter;