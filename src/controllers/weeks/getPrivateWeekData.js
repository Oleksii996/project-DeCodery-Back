import { getBabyStateByWeek, getMomStateByWeek } from "../../services/weeks/getWeekState.js";
import { getDashboardPregnancyProgress } from "../../utils/index.js";


export const getPrivateWeekData = async (req, res) => {
  const { weekNumber } = req.params;
  const requestedWeek = Number(weekNumber);

  if (!Number.isInteger(requestedWeek) || requestedWeek < 1 || requestedWeek > 42) {
    return res.status(400).json({
      message: "Некоректний номер тижня",
    });
  }

  let userWeek = 1;
  let daysToBirth = null;

  if (req.user && req.user.dueDate) {
    const progress = getDashboardPregnancyProgress(req.user.dueDate);

    userWeek = progress.currentWeek;
    daysToBirth = progress.daysUntilDueDate;
  }

  if (requestedWeek > userWeek) {
    return res.status(403).json({
      message: "Цей тиждень ще недоступний",
    });
  }

  try {
    const baby = await getBabyStateByWeek(requestedWeek);
    const mom = await getMomStateByWeek(requestedWeek);

    return res.json({
      weekNumber: requestedWeek,
      userWeek,
      daysToBirth,

      baby: {
        weekNumber: baby.weekNumber,
        size: baby.babySize,
        description: baby.babyDevelopment,
        image: baby.image,
        facts: [baby.babyActivity, baby.interestingFact],
      },

      mom: {
        weekNumber: mom.weekNumber,
        description: mom.feelings?.sensationDescr || "Опис відсутній",
        states: Array.isArray(mom.feelings?.states)
          ? mom.feelings.states
          : [],
        tips: Array.isArray(mom.comfortTips)
          ? mom.comfortTips
          : [],
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
