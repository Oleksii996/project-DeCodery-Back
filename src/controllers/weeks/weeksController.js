import createHttpError from "http-errors";
import { getPregnancyProgress } from "../../utils/getPregnancyProgress.js";
import { getBabyStateByWeek } from "../../services/weeks/getWeekState.js";
import { getMomStateByWeek } from "../../services/weeks/getWeekState.js";

export const getBabyStateController = async (req, res) => {
  const { dueDate } = req.user;

  if (!dueDate) {
    throw createHttpError(400, "Due date is required");
  }

  const { currentWeek } = getPregnancyProgress(dueDate);

  if (!currentWeek || currentWeek < 1 || currentWeek > 42) {
    throw createHttpError(400, "Invalid pregnancy week");
  }

  const data = await getBabyStateByWeek(currentWeek);

  res.status(200).json({
    status: 200,
    message: "Successfully found baby state",
    data,
  });
};
export const getMomStateController = async (req, res) => {
  const { dueDate } = req.user;

  if (!dueDate) {
    throw createHttpError(400, "Due date is required");
  }

  const { currentWeek } = getPregnancyProgress(dueDate);

  if (!currentWeek || currentWeek < 1 || currentWeek > 42) {
    throw createHttpError(400, "Invalid pregnancy week");
  }

  const data = await getMomStateByWeek(currentWeek);

  res.status(200).json({
    status: 200,
    message: "Successfully found mom state",
    data,
  });
};
