import { registerUser } from "./auth/registerUser.js";
import { loginUser } from "./auth/loginUser.js";
import { logoutUser } from "./auth/logoutUser.js";
import { refreshUserSession } from "./auth/refreshUserSession.js";

export const auth = {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserSession,
};
