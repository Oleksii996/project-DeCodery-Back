import { Router } from "express";
import { tasks } from "../controllers/index.js";

const tasksRouter = Router();

tasksRouter.get("/", tasks.getTasks);
tasksRouter.post("/", tasks.createTask);
tasksRouter.patch("/:id", tasks.updateTask);

export default tasksRouter;