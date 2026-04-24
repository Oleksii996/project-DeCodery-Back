import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const getDiaryByIdValidationSchema = {
  [Segments.PARAMS]: Joi.object({
    diaryId: Joi.string().custom(objectIdValidator).required(),
  }),
};
export const createDiaryValidationSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).max(64).required(),
    description: Joi.string().min(1).max(1000).required(),
    date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/),
    emotions: Joi.array()
      .items(Joi.string().custom(objectIdValidator))
      .min(1)
      .max(12)
      .required(),
  }),
};
export const updateDiaryValidationSchema = {
  [Segments.PARAMS]: Joi.object({
    diaryId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).max(64),
    description: Joi.string().min(1).max(1000),
    date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/),
    emotions: Joi.array()
      .items(Joi.string().custom(objectIdValidator))
      .min(1)
      .max(12)
      .required(),
  }).min(1),
};
export const deleteDiaryValidationSchema = {
  [Segments.PARAMS]: Joi.object({
    diaryId: Joi.string().custom(objectIdValidator),
  }),
};
