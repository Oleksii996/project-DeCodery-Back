import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  createDiaryValidationSchema,
  deleteDiaryValidationSchema,
  getDiaryByIdValidationSchema,
  updateDiaryValidationSchema,
} from '../validations/diaryValidation.js';
import {
  createDiary,
  deleteDiary,
  getAllDiaries,
  getDiaryById,
  updateDiary,
} from '../controllers/diaries/diariesControllers.js';
const diariesRouter = Router();
diariesRouter.use('/diaries', authenticate);
diariesRouter.get('/diaries', getAllDiaries);
diariesRouter.get(
  '/diaries/:diaryId',
  celebrate(getDiaryByIdValidationSchema),
  getDiaryById,
);
diariesRouter.post(
  '/diaries',
  celebrate(createDiaryValidationSchema),
  createDiary,
);
diariesRouter.patch(
  '/diaries/:diaryId',
  celebrate(updateDiaryValidationSchema),
  updateDiary,
);
diariesRouter.delete(
  '/diaries/:diaryId',
  celebrate(deleteDiaryValidationSchema),
  deleteDiary,
);
export default diariesRouter;
