import { getBabyStateByWeek, getMomStateByWeek } from "../../services/weeks/getWeekState.js";

export const getWeekData = async (req, res) => {
  const { weekNumber } = req.params;
  const weekNumberNum = Number(weekNumber);

  // Валідація: підтримуємо до 42 тижня
  if (isNaN(weekNumberNum) || weekNumberNum < 1 || weekNumberNum > 42) {
    return res.status(400).json({ message: "Invalid week number" });
  }

  // Тимчасовий розрахунок днів до пологів
  // TODO: замінити на getPregnancyProgress після інтеграції utils
  const daysToBirth = Math.max(0, 280 - weekNumberNum * 7);

  try {
    const baby = await getBabyStateByWeek(weekNumberNum);
    const mom = await getMomStateByWeek(weekNumberNum);

    res.json({
      week: weekNumberNum,
      daysToBirth,
      baby,
      mom,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};