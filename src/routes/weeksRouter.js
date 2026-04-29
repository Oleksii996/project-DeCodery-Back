import { Router } from "express";

import { authenticate } from "../middleware/authenticate.js";

import {
  getPublicWeeksController,
  getPrivateWeeksController,
  getBabyStateController,
  getMomStateController,
} from "../controllers/weeks/weeksController.js";

const weeksRouter = Router();
weeksRouter.get("/public", getPublicWeeksController);
weeksRouter.get("/private", authenticate, getPrivateWeeksController);
weeksRouter.get("/baby", authenticate, getBabyStateController);
weeksRouter.get("/mom", authenticate, getMomStateController);
export default weeksRouter;
