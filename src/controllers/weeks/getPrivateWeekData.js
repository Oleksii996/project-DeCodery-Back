export const getPrivateWeekData = (req, res) => {
  // mock користувач
  const user = {
    currentWeek: 20,
    dueDate: "2026-10-01"
  };

  const daysToBirth = Math.max(0, 280 - user.currentWeek * 7);

  const data = {
    week: user.currentWeek,
    daysToBirth,
    baby: {
      size: "як банан",
      description:
        "Малюк активно рухається, розвивається нервова система та слух. Він вже може реагувати на звуки.",
      facts: [
        "Формується режим сну та активності",
        "Плід може чути голос мами",
        "З’являються перші ворушіння"
      ]
    },
    mom: {
      tip: "Слідкуйте за поставою та робіть легкі фізичні вправи для спини.",
      feelings: [
        "можлива втома",
        "емоційні коливання",
        "відчуття рухів малюка"
      ]
    }
  };

  res.json(data);
};