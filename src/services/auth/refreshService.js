import createHttpError from "http-errors";
import { Session } from "../../models/session.js";
import { createSessionService } from "./SessionService.js";

export const refreshService = async (refreshToken) => {
  const session = await Session.findOne({ refreshToken });

  if (!session) {
    throw createHttpError(401, "Invalid credentials");
  }

  if (new Date(session.refreshTokenValidUntil) < new Date()) {
    throw createHttpError(401, "Session expired");
  }

  await Session.findByIdAndDelete(session._id);
  const newSession = await createSessionService(session.userId);
  return newSession;
};
