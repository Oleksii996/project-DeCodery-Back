import { registerUser } from "./auth/registerUser.js";
import { loginUser } from "./auth/loginUser.js";
import { logoutUser } from "./auth/logoutUser.js";
import { refreshController } from "./auth/refreshSessionController.js";
import { getAllDiaries, getDiaryById, createDiary, updateDiary, deleteDiary } from "./diaries/diariesControllers.js";

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
