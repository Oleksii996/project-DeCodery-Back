import { Router } from "express";
import { updateUserAvatar } from "../controllers/users/usersController.js";
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/upload.js';

const usersRouter = Router();

usersRouter.patch(
    '/me/avatar',
    authenticate,
    upload.single('avatar'),
    updateUserAvatar,
  );

export default usersRouter;