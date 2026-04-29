
import { getPregnancyProgress } from "../../utils/getPregnancyProgress.js";
import { getPublicWeeksDashboardData, getPrivateWeeksDashboardData } from '../services/getWeeksDashboard.js';
import { getBabyStateByWeek, getMomStateByWeek } from '../services/getWeekState.js';
import { getPregnancyProgress } from '../utils/getPregnancyProgress.js';


export const getPublicWeeksController = async (req, res, next) => {
  try {
    const data = await getPublicWeeksDashboardData();
    res.status(200).json({
      status: 200,
      message: "Public dashboard data fetched successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getPrivateWeeksController = async (req, res, next) => {
  try {
    const dueDate = req.user.dueDate;
    const dashboardData = await getPrivateWeeksDashboardData(dueDate);

    const progress = getPregnancyProgress(dueDate);

    res.status(200).json({
      status: 200,
      message: "Private dashboard data fetched successfully",
      data: {
        ...dashboardData,
        weeksLeft: progress.weeksLeft,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getBabyStateController = async (req, res, next) => {
  try {
    const { weekNumber } = req.params;
    const data = await getBabyStateByWeek(Number(weekNumber));
    res.status(200).json({ status: 200, data });
  } catch (error) { next(error); }
};

export const getMomStateController = async (req, res, next) => {
  try {
    const { weekNumber } = req.params;
    const data = await getMomStateByWeek(Number(weekNumber));
    res.status(200).json({ status: 200, data });
  } catch (error) { next(error); }
};
