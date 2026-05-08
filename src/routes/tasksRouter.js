import { Router } from 'express';
import { createTask } from '../controllers/tasks/createTask.js';
import { getTasks } from '../controllers/tasks/getTask.js';
import { updateTaskStatus } from '../controllers/tasks/updateTaskStatus.js';
import { authenticate } from '../middleware/authenticate.js';
import { celebrate } from 'celebrate';
import {
  createTaskSchema,
  updateTaskStatusSchema,
} from '../validations/taskValidation.js';

const tasksRouter = Router();

tasksRouter.post('/', authenticate, celebrate(createTaskSchema), createTask);
tasksRouter.get('/', authenticate, getTasks);
tasksRouter.patch(
  '/:id/status',
  authenticate,
  celebrate(updateTaskStatusSchema),
  updateTaskStatus,
);

export default tasksRouter;
