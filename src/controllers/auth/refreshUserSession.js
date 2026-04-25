import createError from "http-errors";
import * as authServices from "../../services/auth/sessionServices.js";
import { REFRESH_TOKEN_LIFETIME } from "../../constants/index.js";

export const refreshUserSession = async (req, res, next) => {
  try {
    const { sessionId, refreshToken } = req.cookies;

    if (!sessionId || !refreshToken) {
      return next(createError(401, "Session ID and refresh token are required"));
    }

    const session = await authServices.refreshUserSession({
      sessionId,
      refreshToken,
    });

    res.cookie("refreshToken", session.refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + REFRESH_TOKEN_LIFETIME),
    });

    res.cookie("sessionId", session._id, {
      httpOnly: true,
      expires: new Date(Date.now() + REFRESH_TOKEN_LIFETIME),
    });

    res.json({
      status: 200,
      message: "Successfully refreshed a session!",
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (error) {
    next(createError(401, error.message));
  }
};
