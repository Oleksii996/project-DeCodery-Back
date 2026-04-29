import {
  createSessionService,
  setSessionCookies,
} from '../../services/auth/SessionService.js';
import { registerService } from '../../services/auth/registerUserService.js';

export const registerUser = async (req, res) => {
  const body = req.body;

  const user = await registerService(body);

  const newSession = await createSessionService(user._id);
  setSessionCookies(res, newSession);

  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;

  return res.status(201).json({
    user: userWithoutPassword,
  });
};
