import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

export const authenticate = async (req, res, next) => {
  try {
    if (req.user) {
      return next();
    }

    const authHeader = req.headers.authorization;
    const bearerToken = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;
    const cookieToken = req.cookies?.accessToken || req.cookies?.token || null;
    const token = bearerToken || cookieToken;

    if (!token) {
      return next(createHttpError(401, "Unauthorized"));
    }

    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch {
      return next(createHttpError(401, "Unauthorized"));
    }

    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
};
