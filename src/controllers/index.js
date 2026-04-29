import { registerUser } from './auth/registerUser.js';
import { loginUser } from './auth/loginUser.js';
import { logoutUser } from './auth/logoutUser.js';
import { refreshController } from './auth/refreshSessionController.js';

import { getCurrentUser } from './users/getCurrentUser.js';
import { updateCurrentUser } from './users/updateCurrentUser.js';

import {
  getAllDiaries,
  getDiaryById,
  createDiary,
  updateDiary,
  deleteDiary,
} from './diaries/diariesControllers.js';

export const diary = {
  getAllDiaries,
  getDiaryById,
  createDiary,
  updateDiary,
  deleteDiary,
};
export const auth = {
  registerUser,
  loginUser,
  logoutUser,
  refreshController,
};

export const users = {
  getCurrentUser,
  updateCurrentUser,
};
