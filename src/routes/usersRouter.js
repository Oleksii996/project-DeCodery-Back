import { Router } from "express";
import { updateTheme } from "../controllers/users/userThemaController.js";
import { authThema } from "../middleware/authThema.js";
import { validateTheme } from "../validations/usersThemaValidator.js";
import { validationResult } from "express-validator";

const usersRouter = Router();

usersRouter.patch('/theme', authThema, validateTheme, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  updateTheme(req, res, next);
});

export default usersRouter;
