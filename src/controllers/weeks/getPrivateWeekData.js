import { getPregnancyProgress } from "../../utils/getPregnancyProgress.js";
import { getBabyStateByWeek, getMomStateByWeek } from "../../services/weeks/getWeekState.js";

export const getPrivateWeekData = async (req, res) => {
  let currentWeek;
  let daysToBirth;

  if (req.user && req.user.dueDate) {
    const progress = getPregnancyProgress(req.user.dueDate);
    currentWeek = progress.currentWeek;
    daysToBirth = progress.daysToBirth;
  } else {
    // TODO: replace fallback with real user data when auth is implemented
    currentWeek = 20;
    daysToBirth = Math.max(0, 280 - currentWeek * 7);
  }

  try {
    const baby = await getBabyStateByWeek(currentWeek);
    const mom = await getMomStateByWeek(currentWeek);

    res.json({
      week: currentWeek,
      daysToBirth,
      baby,
      mom,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};