import { loginService } from "../../services/auth/loginUserService.js";
import {
  createSessionService,
  setSessionCookies,
} from "../../services/auth/SessionService.js";

export const loginUser = async (req, res) => {
  const body = req.body;

  const { user, pregnancyProgress } = await loginService(body);

  const newSession = await createSessionService(user._id);
  setSessionCookies(res, newSession);

  return res.status(201).json({
    user,
    pregnancyProgress,
  });
};
