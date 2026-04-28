import { Session } from '../../models/session.js';

export const logoutService = async (sessionId) => {
  if (!sessionId) return;

  await Session.findByIdAndDelete(sessionId);
};
