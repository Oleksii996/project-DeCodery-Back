import { getBabyStateByWeek, getMomStateByWeek } from "../../services/weeks/getWeekState.js";
import { getDashboardPregnancyProgress } from "../../utils/index.js";

export const getPrivateWeekData = async (req, res) => {
  let currentWeek = 1;
  let daysToBirth = null;
  let dayIndex = 0;

  if (req.user && req.user.dueDate) {
    const progress = getDashboardPregnancyProgress(req.user.dueDate);

    currentWeek = progress.currentWeek;
    daysToBirth = progress.daysUntilDueDate;
    dayIndex = progress.dayIndexInWeek;
  }

  try {
    const baby = await getBabyStateByWeek(currentWeek);
    const mom = await getMomStateByWeek(currentWeek);

    const tip =
      Array.isArray(baby.momDailyTips) &&
      baby.momDailyTips[dayIndex]
        ? baby.momDailyTips[dayIndex]
        : null;

    res.json({
      weekNumber: currentWeek,
      daysToBirth,

      baby: {
        weekNumber: baby.weekNumber,
        size: baby.babySize,
        description: baby.babyDevelopment,
        image: baby.image, 
        facts: [
          baby.babyActivity,
          baby.interestingFact,
        ],
      },

      mom: {
        weekNumber: mom.weekNumber,
        description: mom.feelings?.sensationDescr || "Опис відсутній",
        tips: tip ? [tip] : [],
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};