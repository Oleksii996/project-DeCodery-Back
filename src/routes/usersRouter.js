import { Router } from "express";
import { updateTheme } from "../controllers/users/userThemaController.js";
import { authThema } from "../middleware/authThema.js";
import { validateTheme } from "../validations/usersThemaValidator.js";
import { updateUserAvatar } from "../controllers/users/usersController.js";
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/upload.js';

const usersRouter = Router();

usersRouter.patch('/theme', authThema, validateTheme, updateTheme);

usersRouter.patch(
  '/me/avatar',
  authenticate,
  upload.single('avatar'),
  updateUserAvatar,
);

export default usersRouter;
