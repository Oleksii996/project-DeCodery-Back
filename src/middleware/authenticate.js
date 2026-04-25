import createError from "http-errors";
import { verifyToken } from "../utils/jwt.js";
import { Session } from "../models/session.js";
import { User } from "../models/user.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(createError(401, "Authorization header missing"));
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return next(createError(401, "Invalid authorization header format"));
  }

  const payload = verifyToken(token, process.env.JWT_ACCESS_SECRET || "access_secret");

  if (!payload) {
    return next(createError(401, "Invalid or expired access token"));
  }

  const session = await Session.findOne({ accessToken: token });

  if (!session) {
    return next(createError(401, "Session not found or invalidated"));
  }

  const isAccessTokenExpired = new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    return next(createError(401, "Access token expired"));
  }

  const user = await User.findById(session.userId);

  if (!user) {
    return next(createError(401, "User not found"));
  }

  req.user = user;
  req.session = session;

  next();
};
