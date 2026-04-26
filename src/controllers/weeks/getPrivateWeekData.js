import { getBabyStateByWeek, getMomStateByWeek } from "../../services/weeks/getWeekState.js";

export const getPrivateWeekData = async (req, res) => {
  const currentWeek = 20;

  const daysToBirth = Math.max(0, 280 - currentWeek * 7);

  const baby = await getBabyStateByWeek(currentWeek);
  const mom = await getMomStateByWeek(currentWeek);

  res.json({
    week: currentWeek,
    daysToBirth,
    baby,
    mom,
  });
};