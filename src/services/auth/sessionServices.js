import { Session } from "../../models/session.js";
import { createToken, verifyToken } from "../../utils/jwt.js";
import { ACCESS_TOKEN_LIFETIME, REFRESH_TOKEN_LIFETIME } from "../../constants/index.js";

export const logoutUser = async (sessionId) => {
  await Session.deleteOne({ _id: sessionId });
};

export const refreshUserSession = async ({ sessionId, refreshToken }) => {
  const session = await Session.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw new Error("Session not found");
  }

  const isRefreshTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isRefreshTokenExpired) {
    throw new Error("Session expired");
  }

  // Optional: verify JWT signature too if refreshToken is a JWT
  // For now let's assume it's just a secure random string or JWT
  // If it's JWT:
  // const payload = verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET);
  // if (!payload) throw new Error("Invalid refresh token");

  const newSession = await createSession(session.userId);

  await Session.deleteOne({ _id: sessionId });

  return newSession;
};

export const createSession = async (userId) => {
  const accessToken = createToken(
    { userId },
    process.env.JWT_ACCESS_SECRET || "access_secret",
    "15m"
  );
  const refreshToken = createToken(
    { userId },
    process.env.JWT_REFRESH_SECRET || "refresh_secret",
    "30d"
  );

  return await Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_LIFETIME),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_LIFETIME),
  });
};
