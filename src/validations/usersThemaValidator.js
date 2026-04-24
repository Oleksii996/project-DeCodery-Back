import { body } from "express-validator";

const allowedColors = ["yellow", "blue", "pink"];

export const validateTheme = [
  body("color")
    .isString()
    .custom(value => allowedColors.includes(value))
    .withMessage(`Некоректний колір. Доступні: ${allowedColors.join(", ")}`)
];
