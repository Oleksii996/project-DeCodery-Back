import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const emotionValidationSchema = {
  [Segments.PARAMS]: Joi.object({
    _id: Joi.string().custom(objectIdValidator).required(),
    title: Joi.string().allow(''),
  }),
};
