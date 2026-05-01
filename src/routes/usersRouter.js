import { Router } from 'express';
import { updateTheme } from '../controllers/users/userThemaController.js';
import { authThema } from '../middleware/authThema.js';
import { validateTheme } from '../validations/usersThemaValidator.js';
import { updateUserAvatar } from '../controllers/users/usersController.js';

import { celebrate } from 'celebrate';

import { users as controller } from '../controllers/index.js';
import { updateCurrentUserSchema } from '../validations/index.js';

import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/upload.js';

const usersRouter = Router();

usersRouter.patch('/theme', authThema, validateTheme, updateTheme);
usersRouter.get('/current', authenticate, controller.getCurrentUser);
usersRouter.patch(
  '/current',
  authenticate,
  celebrate(updateCurrentUserSchema),
  controller.updateCurrentUser,
);

usersRouter.patch(
  '/me/avatar',
  authenticate,
  upload.single('avatar'),
  updateUserAvatar,
);

export default usersRouter;
