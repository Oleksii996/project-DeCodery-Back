import { Router } from "express";
import { auth as ctrl } from "../controllers/index.js";

const authRouter = Router();

authRouter.post("/register", ctrl.registerUser);

export default authRouter;
