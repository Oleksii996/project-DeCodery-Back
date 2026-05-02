import createHttpError from 'http-errors';
import { BabyStateModel } from '../../models/baby_state.js';
import { getDashboardPregnancyProgress } from '../../utils/getDashboardPregnancyProgress.js';

const LAST_WEEK = 40;
const DEFAULT_PUBLIC_WEEK = 1;

const getPublicDaysUntilDueDate = () => {
  return (LAST_WEEK - DEFAULT_PUBLIC_WEEK) * 7;
};

export const getPublicWeeksDashboardData = async () => {
  const currentWeek = DEFAULT_PUBLIC_WEEK;
  const daysUntilDueDate = getPublicDaysUntilDueDate();

  const babyState = await BabyStateModel.findOne({
    weekNumber: currentWeek,
  }).lean();

  if (!babyState) {
    throw createHttpError(
      404,
      `Dashboard data for week ${currentWeek} not found`,
    );
  }

  return {
    weekNumber: currentWeek,
    daysUntilDueDate,
    baby: {
      analogy: babyState.analogy,
      babySize: babyState.babySize,
      babyWeight: babyState.babyWeight,
      image: babyState.image,
      interestingFact: babyState.interestingFact,
    },
    momTip: babyState.momDailyTips?.[0] ?? null,
  };
};

export const getPrivateWeeksDashboardData = async (dueDate) => {
  if (!dueDate) {
    throw createHttpError(400, 'Due date is required');
  }

  const { currentWeek, daysUntilDueDate, dayIndexInWeek } =
    getDashboardPregnancyProgress(dueDate);

  const babyState = await BabyStateModel.findOne({
    weekNumber: currentWeek,
  }).lean();

  if (!babyState) {
    throw createHttpError(
      404,
      `Dashboard data for week ${currentWeek} not found`,
    );
  }

  return {
    weekNumber: currentWeek,
    daysUntilDueDate,
    baby: {
      analogy: babyState.analogy,
      babySize: babyState.babySize,
      babyWeight: babyState.babyWeight,
      image: babyState.image,
      interestingFact: babyState.interestingFact,
    },
    momTip: babyState.momDailyTips?.[dayIndexInWeek] ?? null,
  };
};
