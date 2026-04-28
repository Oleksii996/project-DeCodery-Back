import { registerUser } from "./auth/registerUser.js";
import { loginUser } from "./auth/loginUser.js";
import { logoutUser } from "./auth/logoutUser.js";
import { getCurrentUser } from "./users/getCurrentUser.js";
import { updateCurrentUser } from "./users/updateCurrentUser.js";

export const auth = {
  registerUser,
  loginUser,
  logoutUser,
};

export const users = {
  getCurrentUser,
  updateCurrentUser,
};
