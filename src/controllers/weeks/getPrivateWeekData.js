import { getBabyStateByWeek, getMomStateByWeek } from "../../services/weeks/getWeekState.js";
import { getPregnancyProgress } from "../../utils/index.js";

export const getPrivateWeekData = async (req, res) => {
  const { weekNumber } = req.params;
  const weekNumberNum = Number(weekNumber);

  if (isNaN(weekNumberNum) || weekNumberNum < 1 || weekNumberNum > 42) {
    return res.status(400).json({ message: "Invalid week number" });
  }

  let daysToBirth = null;

  if (req.user && req.user.dueDate) {
    const progress = getPregnancyProgress(req.user.dueDate);
    daysToBirth = progress.daysUntilDueDate;
  }

  try {
    const baby = await getBabyStateByWeek(weekNumberNum);
    const mom = await getMomStateByWeek(weekNumberNum);

    res.json({
      weekNumber: weekNumberNum,
      daysToBirth,
      baby: {
        weekNumber: baby.weekNumber,
        size: baby.size,
        description: baby.description,
        facts: baby.facts,
      },
      mom: {
        weekNumber: mom.weekNumber,
        description: mom.feelings?.[0] || "Опис відсутній",
        tips: mom.comfortTips?.map(item => item.tip) || [],
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};