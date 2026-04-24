import { refreshService } from "../../services/auth/refreshService.js";
import { setSessionCookies } from "../../services/auth/SessionService.js";

export const refreshController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const newSession = await refreshService(refreshToken);
  setSessionCookies(res, newSession);
  res.status(200).json(true);
};
