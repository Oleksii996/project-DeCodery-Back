import createHttpError from "http-errors";
import { BabyStateModel } from "../../models/baby_state.js";
import { MomStateModel } from "../../models/mom_state.js";

export const getBabyStateByWeek = async (weekNumber) => {
  const babyState = await BabyStateModel.findOne({ weekNumber }).lean();

  if (!babyState) {
    throw createHttpError(404, `Baby state for week ${weekNumber} not found`);
  }

  return babyState;
};

export const getMomStateByWeek = async (weekNumber) => {
  const momState = await MomStateModel.findOne({ weekNumber }).lean();

  if (!momState) {
    throw createHttpError(404, `Mom state for week ${weekNumber} not found`);
  }

  return momState;
};
