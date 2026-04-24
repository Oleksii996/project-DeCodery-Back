import { Router } from "express";

import { auth as controller } from "../controllers/index.js";
import { celebrate } from "celebrate";
import {
  loginUserSchema,
  registerUserSchema,
} from "../validations/authValidation.js";

const authRouter = Router();

authRouter.post(
  "/register",
  celebrate(registerUserSchema),
  controller.registerUser,
);
authRouter.post("/login", celebrate(loginUserSchema), controller.loginUser);
authRouter.post("/logout", controller.logoutUser);
authRouter.post("/refresh", controller.refreshController);

export default authRouter;
