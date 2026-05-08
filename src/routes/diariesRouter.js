import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  createDiaryValidationSchema,
  deleteDiaryValidationSchema,
  getDiaryByIdValidationSchema,
  updateDiaryValidationSchema,
} from '../validations/diaryValidation.js';
import { diary as ctrl } from '../controllers/index.js';
import { authenticate } from '../middleware/authenticate.js';



const diariesRouter = Router();
diariesRouter.use('/', authenticate);
diariesRouter.get('/', ctrl.getAllDiaries);
diariesRouter.get(
  '/:diaryId',
  celebrate(getDiaryByIdValidationSchema),
  ctrl.getDiaryById,
);
diariesRouter.post(
  '/',
  celebrate(createDiaryValidationSchema),
  ctrl.createDiary,
);
diariesRouter.patch(
  '/:diaryId',
  celebrate(updateDiaryValidationSchema),
  ctrl.updateDiary,
);
diariesRouter.delete(
  '/:diaryId',
  celebrate(deleteDiaryValidationSchema),
  ctrl.deleteDiary,
);
export default diariesRouter;
