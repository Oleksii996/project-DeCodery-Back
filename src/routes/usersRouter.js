import { Router } from "express";
import { celebrate } from "celebrate";

import { users as controller } from "../controllers/index.js";
import { authenticate } from "../middleware/authenticate.js";
import { updateCurrentUserSchema } from "../validations/index.js";

const usersRouter = Router();

usersRouter.get("/current", authenticate, controller.getCurrentUser);
usersRouter.patch(
  "/current",
  authenticate,
  celebrate(updateCurrentUserSchema),
  controller.updateCurrentUser,
);

export default usersRouter;
