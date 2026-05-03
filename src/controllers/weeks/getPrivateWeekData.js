import { getBabyStateByWeek, getMomStateByWeek } from "../../services/weeks/getWeekState.js";
import { getDashboardPregnancyProgress } from "../../utils/index.js";

export const getPrivateWeekData = async (req, res) => {
  let currentWeek = 1;
  let daysToBirth = null;

  if (req.user && req.user.dueDate) {
    const progress = getDashboardPregnancyProgress(req.user.dueDate);

    currentWeek = progress.currentWeek;
    daysToBirth = progress.daysUntilDueDate;
  }

  try {
    const baby = await getBabyStateByWeek(currentWeek);
    const mom = await getMomStateByWeek(currentWeek);

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

     
        tips: mom.comfortTips || [],
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};