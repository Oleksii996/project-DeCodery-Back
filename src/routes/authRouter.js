import { Router } from "express";

import { auth as controller } from "../controllers/index.js";
import { authenticate } from "../middleware/authenticate.js";

const authRouter = Router();

authRouter.post("/register", controller.registerUser);
authRouter.post("/login", controller.loginUser);
authRouter.post("/logout", authenticate, controller.logoutUser);
authRouter.post("/refresh", controller.refreshUserSession);

export default authRouter;
