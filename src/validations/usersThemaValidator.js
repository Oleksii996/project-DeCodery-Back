import { celebrate, Joi, Segments } from "celebrate";

const allowedColors = ["yellow", "blue", "pink"];

export const validateTheme = celebrate({
  [Segments.BODY]: Joi.object().keys({
    color: Joi.string()
      .valid(...allowedColors)
      .required()
      .messages({
        "any.only": `Некоректний колір. Доступні: ${allowedColors.join(", ")}`,
        "string.base": "Колір має бути рядком",
        "any.required": "Поле color є обов'язковим"
      })
  })
});