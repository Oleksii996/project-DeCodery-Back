// src/middleware/authenticate.js

import createHttpError from "http-errors";
import { Session } from "../models/session.js";
import { User } from "../models/user.js";

export const authenticate = async (req, res, next) => {
  if (!req.cookies.accessToken) {
    throw createHttpError(401, "Missing access token");
  }

  const session = await Session.findOne({
    accessToken: req.cookies.accessToken,
  });

  if (!session) {
    throw createHttpError(401, "Session not found");
  } // 4. Перевіряємо термін дії access токена

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    throw createHttpError(401, "Access token expired");
  } // 5. Якщо з токеном все добре і сесія існує,

  // шукаємо користувача
  const user = await User.findById(session.userId); // 6. Якщо користувача не знайдено

  if (!user) {
    throw createHttpError(401);
  } // 7. Якщо користувач існує, додаємо його до запиту

  req.user = user; // 8. Передаємо управління далі

  next();
};
