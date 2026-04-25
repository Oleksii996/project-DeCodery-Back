import * as authServices from "../../services/auth/sessionServices.js";

export const logoutUser = async (req, res, next) => {
  try {
    const { _id: sessionId } = req.session;

    await authServices.logoutUser(sessionId);

    res.clearCookie("sessionId");
    res.clearCookie("refreshToken");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
