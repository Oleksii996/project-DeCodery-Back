import { Router } from "express";
import { createTask } from "../controllers/tasks/createTask.js";
import { getTasks } from "../controllers/tasks/getTask.js";
import { updateTaskStatus } from "../controllers/tasks/updateTaskStatus.js";
import { authenticate } from "../middleware/authenticate.js";

const tasksRouter = Router();

tasksRouter.post("/", authenticate, createTask);
tasksRouter.get("/", authenticate, getTasks);
tasksRouter.patch("/:id", authenticate, updateTaskStatus);

export default tasksRouter;