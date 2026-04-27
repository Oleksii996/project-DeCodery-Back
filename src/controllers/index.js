import { registerUser } from "./auth/registerUser.js";
import { loginUser } from "./auth/loginUser.js";
import { logoutUser } from "./auth/logoutUser.js";
import { refreshController } from "./auth/refreshSessionController.js";

export const auth = {
  registerUser,
  loginUser,
  logoutUser,
  refreshController,
};
