import createHttpError from 'http-errors';
import { getPregnancyProgress } from '../../utils/getPregnancyProgress.js';
import {
  getPublicWeeksDashboardData,
  getPrivateWeeksDashboardData,
} from '../../services/weeks/getWeeksDashboard.js';
import {
  getBabyStateByWeek,
  getMomStateByWeek,
} from '../../services/weeks/getWeekState.js';

export const getPublicWeeksController = async (req, res, next) => {
  const data = await getPublicWeeksDashboardData();
  res.status(200).json({
    status: 200,
    message: 'Public dashboard data fetched successfully',
    data,
  });
};

export const getPrivateWeeksController = async (req, res, next) => {
  if (!req.user) {
    throw createHttpError(401, 'User not authorized');
  }
  const { dueDate } = req.user;
  if (!dueDate) {
    throw createHttpError(400, 'Due date is required');
  }
  const data = await getPrivateWeeksDashboardData(dueDate);

  res.status(200).json({
    status: 200,
    message: 'Private dashboard data fetched successfully',
    data,
  });
};

export const getBabyStateController = async (req, res) => {
  const { dueDate } = req.user;

  if (!dueDate) {
    throw createHttpError(400, 'Due date is required');
  }

  const { currentWeek } = getPregnancyProgress(dueDate);

  if (!currentWeek || currentWeek < 1 || currentWeek > 42) {
    throw createHttpError(400, 'Invalid pregnancy week');
  }

  const data = await getBabyStateByWeek(currentWeek);

  res.status(200).json({
    status: 200,
    message: 'Successfully found baby state',
    data,
  });
};

export const getMomStateController = async (req, res) => {
  const { dueDate } = req.user;

  if (!dueDate) {
    throw createHttpError(400, 'Due date is required');
  }

  const { currentWeek } = getPregnancyProgress(dueDate);

  if (!currentWeek || currentWeek < 1 || currentWeek > 42) {
    throw createHttpError(400, 'Invalid pregnancy week');
  }

  const data = await getMomStateByWeek(currentWeek);

  res.status(200).json({
    status: 200,
    message: 'Successfully found mom state',
    data,
  });
};
