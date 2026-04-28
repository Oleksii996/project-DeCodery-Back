import createHttpError from "http-errors";
import { babyStateModel } from "../../models/baby_state.js";
import { momStateModel } from "../../models/mom_state.js";

export const getBabyStateByWeek = async (weekNumber) => {
  const babyState = await babyStateModel.findOne({ weekNumber }).lean();

  if (!babyState) {
    throw createHttpError(404, `Baby state for week ${weekNumber} not found`);
  }

  return babyState;
};

export const getMomStateByWeek = async (weekNumber) => {
  const momState = await momStateModel.findOne({ weekNumber }).lean();

  if (!momState) {
    throw createHttpError(404, `Mom state for week ${weekNumber} not found`);
  }

  return momState;
};
