import { Router } from 'express';

import { auth as controller } from '../controllers/index.js';
import { celebrate } from 'celebrate';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/authValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const authRouter = Router();

authRouter.post(
  '/register',
  celebrate(registerUserSchema),
  controller.registerUser,
);

// login
authRouter.post('/login', celebrate(loginUserSchema), controller.loginUser);
// logout
authRouter.post('/logout', authenticate, controller.logoutUser);
// refresh
authRouter.post('/refresh', authenticate, controller.refreshController);
authRouter.get('/me', authenticate, controller.getMeController);

export default authRouter;
