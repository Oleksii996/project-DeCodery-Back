import { Joi, Segments } from "celebrate";

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const validateDueDate = (value, helpers) => {
  if (!DATE_REGEX.test(value)) {
    return helpers.error("any.invalid");
  }

  const dueDate = new Date(value);
  dueDate.setHours(0, 0, 0, 0);

  if (Number.isNaN(dueDate.getTime())) {
    return helpers.error("any.invalid");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() + 7);

  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 40 * 7);

  if (dueDate < minDate || dueDate > maxDate) {
    return helpers.error("date.range");
  }

  return value;
};

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().max(32).required().messages({
      "string.base": "Name must be a string",
      "string.max": "Name must be at most 32 characters long",
      "any.required": "Name is required",
    }),
    email: Joi.string().email().max(64).required().messages({
      "string.base": "Email must be a string",
      "string.email": "Email must be a valid email",
      "string.max": "Email must be at most 64 characters long",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(8).max(128).required().messages({
      "string.base": "Password must be a string",
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must be at most 128 characters long",
      "any.required": "Password is required",
    }),
    gender: Joi.string().valid("boy", "girl").allow(null).messages({
      "any.only": "Gender must be one of: boy, girl, null",
    }),
    dueDate: Joi.string().required().custom(validateDueDate).messages({
      "string.base": "Due date must be a string",
      "any.required": "Due date is required",
      "any.invalid": "Due date must be in format YYYY-MM-DD",
      "date.range":
        "Due date must be between current date + 1 week and current date + 40 weeks",
    }),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().max(64).required().messages({
      "string.base": "Email must be a string",
      "string.email": "Email must be a valid email",
      "string.max": "Email must be at most 64 characters long",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(8).max(128).required().messages({
      "string.base": "Password must be a string",
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must be at most 128 characters long",
      "any.required": "Password is required",
    }),
  }),
};
