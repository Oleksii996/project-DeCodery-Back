import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";

import {
  getBabyStateController,
  getMomStateController,
} from "../controllers/weeks/weeksController.js";

const weeksRouter = Router();
weeksRouter.get("/baby", authenticate, getBabyStateController);
weeksRouter.get("/mom", authenticate, getMomStateController);
export default weeksRouter;
