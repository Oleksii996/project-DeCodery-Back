import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";

import { getWeekData } from "../controllers/weeks/getWeekData.js";
import { getPrivateWeekData } from "../controllers/weeks/getPrivateWeekData.js";

const weeksRouter = Router();

// PRIVATE
weeksRouter.get("/private", authenticate, getPrivateWeekData);

// PUBLIC
weeksRouter.get("/:weekNumber", getWeekData);

export default weeksRouter;