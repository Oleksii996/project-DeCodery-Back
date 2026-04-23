import { Router } from "express";

import { auth as controller } from "../controllers/index.js";

const authRouter = Router();

authRouter.post("/register", controller.registerUser);
authRouter.post("/login", controller.loginUser);
authRouter.post("/logout", controller.logoutUser);

export default authRouter;
