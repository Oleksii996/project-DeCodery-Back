import { getPregnancyProgress } from "../../utils/getPregnancyProgress.js";
import { getBabyStateByWeek, getMomStateByWeek } from "../../services/weeks/getWeekState.js";

export const getPrivateWeekData = async (req, res) => {
  const { dueDate } = req.user;

  if (!dueDate) {
    return res.status(400).json({ message: "Due date is required" });
  }

  //  рахуємо тиждень і дні
  const { currentWeek, daysToBirth } = getPregnancyProgress(dueDate);

  //  беремо дані
  const baby = await getBabyStateByWeek(currentWeek);
  const mom = await getMomStateByWeek(currentWeek);

  res.json({
    week: currentWeek,
    daysToBirth,
    baby,
    mom,
  });
};