import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";

import { getWeekData } from "../controllers/weeks/getWeekData.js";
import { getPrivateWeekData } from "../controllers/weeks/getPrivateWeekData.js";

import {
  getBabyStateController,
  getMomStateController,
} from "../controllers/weeks/weeksController.js";

const weeksRouter = Router();

//  мій ENDPOINT-и (основні)
weeksRouter.get("/:weekNumber", getWeekData);
weeksRouter.get("/private/:weekNumber", authenticate, getPrivateWeekData);

// ENDPOINT-и з main (залишаємо щоб не ламати проект)
weeksRouter.get("/baby", authenticate, getBabyStateController);
weeksRouter.get("/mom", authenticate, getMomStateController);

export default weeksRouter;