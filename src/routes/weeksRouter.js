import { Router } from "express";
import { getWeekData } from "../controllers/weeks/getWeekData.js";
import { getPrivateWeekData } from "../controllers/weeks/getPrivateWeekData.js";

const weeksRouter = Router();

weeksRouter.get("/private", getPrivateWeekData);
weeksRouter.get("/:weekNumber", getWeekData);

export default weeksRouter;