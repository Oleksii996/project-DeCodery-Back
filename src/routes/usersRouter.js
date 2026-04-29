import { Router } from 'express';
import { celebrate } from 'celebrate';

import { users as controller } from '../controllers/index.js';
import { updateCurrentUserSchema } from '../validations/index.js';

import { updateUserAvatar } from '../controllers/users/usersController.js';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/upload.js';

const usersRouter = Router();

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
