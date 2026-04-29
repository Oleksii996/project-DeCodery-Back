import { getBabyStateByWeek, getMomStateByWeek } from "../../services/weeks/getWeekState.js";

export const getWeekData = async (req, res) => {
 
  const weekNumberNum = 1;

  const daysToBirth = 273;

  try {
    const baby = await getBabyStateByWeek(weekNumberNum);
    const mom = await getMomStateByWeek(weekNumberNum);

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

        //   беремо з baby_state
        tips: Array.isArray(baby.momDailyTips)
          ? baby.momDailyTips
          : [],
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};