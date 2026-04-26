import { getBabyStateByWeek, getMomStateByWeek } from "../../services/weeks/getWeekState.js";

export const getWeekData = async (req, res) => {
  const { weekNumber } = req.params;
  const weekNumberNum = Number(weekNumber);

  // валідація
  if (isNaN(weekNumberNum) || weekNumberNum < 1 || weekNumberNum > 40) {
    return res.status(400).json({ message: "Invalid week number" });
  }

  // розрахунок днів
  const daysToBirth = Math.max(0, 280 - weekNumberNum * 7);

  //  беремо дані з сервісів
  const baby = await getBabyStateByWeek(weekNumberNum);
  const mom = await getMomStateByWeek(weekNumberNum);

  res.json({
    week: weekNumberNum,
    daysToBirth,
    baby,
    mom,
  });
};