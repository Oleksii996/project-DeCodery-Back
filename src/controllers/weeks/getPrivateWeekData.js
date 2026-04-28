import { getBabyStateByWeek, getMomStateByWeek } from "../../services/weeks/getWeekState.js";
import { getDashboardPregnancyProgress } from "../../utils/index.js";

export const getPrivateWeekData = async (req, res) => {
  const { weekNumber } = req.params;
  const weekNumberNum = Number(weekNumber);

  if (isNaN(weekNumberNum) || weekNumberNum < 1 || weekNumberNum > 42) {
    return res.status(400).json({ message: "Invalid week number" });
  }

  let daysToBirth = null;
  let dayIndex = 0;

  if (req.user && req.user.dueDate) {
    const progress = getDashboardPregnancyProgress(req.user.dueDate);
    daysToBirth = progress.daysUntilDueDate;
    dayIndex = progress.dayIndexInWeek;
  }

  try {
    const baby = await getBabyStateByWeek(weekNumberNum);
    const mom = await getMomStateByWeek(weekNumberNum);

    //  беремо tip по дню з baby_state
    const tip =
      Array.isArray(baby.momDailyTips) &&
      baby.momDailyTips[dayIndex]
        ? baby.momDailyTips[dayIndex]
        : null;

    res.json({
      weekNumber: weekNumberNum,
      daysToBirth,

      //  BABY
      baby: {
        weekNumber: baby.weekNumber,
        size: baby.size,
        description: baby.description,
        facts: baby.facts,
      },

      //  MOM
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