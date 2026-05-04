import { getBabyStateByWeek, getMomStateByWeek } from "../../services/weeks/getWeekState.js";

export const getWeekData = async (req, res) => {
  const { weekNumber } = req.params;
  const weekNumberNum = Number(weekNumber);

  const daysToBirth = Math.max(0, 280 - weekNumberNum * 7);

  try {
    const baby = await getBabyStateByWeek(weekNumberNum);
    const mom = await getMomStateByWeek(weekNumberNum);

    res.json({
      weekNumber: weekNumberNum,
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

        description:
          mom.feelings?.sensationDescr || "Опис відсутній",

        //  STATES
        states: Array.isArray(mom.feelings?.states)
          ? mom.feelings.states
          : [],

        // TIPS
        tips: Array.isArray(mom.comfortTips)
          ? mom.comfortTips
          : [],
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};