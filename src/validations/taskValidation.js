import { Joi, Segments } from 'celebrate';

export const createTaskSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).max(100).required(),
    date: Joi.string()
      .pattern(/^\d{2}\.\d{2}\.\d{4}$/)
      .required(),
    status: Joi.string()
      .valid('pending', 'in-progress', 'done')
      .default('pending'),
  }),
};
export const updateTaskStatusSchema = {
  [Segments.BODY]: Joi.object({
    status: Joi.string().valid('pending', 'in-progress', 'done').required(),
  }),
};
