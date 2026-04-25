import { registerUser } from "./auth/registerUser.js";
import { loginUser } from "./auth/loginUser.js";
import { logoutUser } from "./auth/logoutUser.js";
import { tasks } from "./tasks/index.js"; 

export const auth = {
  registerUser,
  loginUser,
  logoutUser,
};

export { tasks }; 