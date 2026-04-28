import { logoutService } from '../../services/auth/logoutUserService.js';

export const logoutUser = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await logoutService(sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  return res.status(204).send();
};
