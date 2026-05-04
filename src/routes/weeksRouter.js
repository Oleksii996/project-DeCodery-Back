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

// 🔹 main (НЕ ЧІПАЄМО)
weeksRouter.get("/", getPublicWeeksController);
weeksRouter.get("/me", authenticate, getPrivateWeeksController);

// 🔹 існуючі роуті
weeksRouter.get("/baby", authenticate, getBabyStateController);
weeksRouter.get("/mom", authenticate, getMomStateController);

// 🔹 нові (твій функціонал)
weeksRouter.get("/private/:weekNumber", authenticate, getPrivateWeekData);
weeksRouter.get("/:weekNumber", getWeekData);

export default weeksRouter;