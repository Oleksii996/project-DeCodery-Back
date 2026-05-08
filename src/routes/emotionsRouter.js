import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { celebrate } from "celebrate";
import { emotionValidationSchema } from "../validations/emotionValidation.js";
import { getAllEmotions, getEmotionById } from "../controllers/emotionsController.js";


const emotionsRouter = Router();

emotionsRouter.use('/', authenticate);
emotionsRouter.get('/', getAllEmotions);
emotionsRouter.get('/:emotionId', celebrate(emotionValidationSchema), getEmotionById);

export default emotionsRouter;
