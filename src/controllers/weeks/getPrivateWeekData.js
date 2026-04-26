import { getBabyStateByWeek, getMomStateByWeek } from "../../services/weeks/getWeekState.js";
import { getPregnancyProgress } from "../../utils/index.js";

export const getPrivateWeekData = async (req, res) => {
  let currentWeek;
  let daysToBirth;

  if (req.user && req.user.dueDate) {
    const progress = getPregnancyProgress(req.user.dueDate);

    currentWeek = progress.currentWeek;

    // Тимчасово використовуємо daysUntilDueDate з утиліти
    // у відповіді залишаємо поле daysToBirth для сумісності з фронтом
    daysToBirth = progress.daysUntilDueDate;
  } else {
    // TODO: замінити fallback після реалізації авторизації
  // та використовувати getPregnancyProgress для реального користувача
    currentWeek = 20;

    // Тимчасовий розрахунок
    // TODO: замінити на getPregnancyProgress
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