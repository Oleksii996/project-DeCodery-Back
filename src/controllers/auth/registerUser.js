import {
  createSessionService,
  setSessionCookies,
} from "../../services/auth/SessionService.js";
import { registerService } from "../../services/auth/registerUserService.js";

export const registerUser = async (req, res) => {
  const body = req.body;
  const { user, pregnancyProgress } = await registerService(body);
  console.log(user);

  const newSession = await createSessionService(user._id);
  setSessionCookies(res, newSession);

  return res.status(201).json({ user, pregnancyProgress });
};
