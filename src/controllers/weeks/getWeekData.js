import { getBabyStateByWeek, getMomStateByWeek } from "../../services/weeks/getWeekState.js";

export const getWeekData = async (req, res) => {
  const { weekNumber } = req.params;
  const weekNumberNum = Number(weekNumber);

  // ✅ Валідація
  if (isNaN(weekNumberNum) || weekNumberNum < 1 || weekNumberNum > 42) {
    return res.status(400).json({ message: "Invalid week number" });
  }

  // ✅ тимчасовий розрахунок
  const daysToBirth = Math.max(0, 280 - weekNumberNum * 7);

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

        // беремо перший елемент масиву
        description: mom.feelings?.[0] || "Опис відсутній",

        // беремо тільки текст tip
        tips: mom.comfortTips?.map(item => item.tip) || [],
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};