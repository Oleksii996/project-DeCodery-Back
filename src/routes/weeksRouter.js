import { Router } from "express";

import { authenticate } from "../middleware/authenticate.js";

import { getWeekData } from "../controllers/weeks/getWeekData.js";
import { getPrivateWeekData } from "../controllers/weeks/getPrivateWeekData.js";

import {
  getPublicWeeksController,
  getPrivateWeeksController,
  getBabyStateController,
  getMomStateController,
} from "../controllers/weeks/weeksController.js";

const weeksRouter = Router();

// 🔹 нові роуті з main
weeksRouter.get("/", getPublicWeeksController);
weeksRouter.get("/me", authenticate, getPrivateWeeksController);

// 🔹 твої роуті (ВАЖЛИВІ для фронта)
weeksRouter.get("/:weekNumber", getWeekData);
weeksRouter.get("/private/:weekNumber", authenticate, getPrivateWeekData);

// 🔹 інші
weeksRouter.get("/baby", authenticate, getBabyStateController);
weeksRouter.get("/mom", authenticate, getMomStateController);

export default weeksRouter;