export const getWeekData = (req, res) => {
  const { weekNumber } = req.params;

  const weekNumberNum = Number(weekNumber);

  if (isNaN(weekNumberNum) || weekNumberNum < 1 || weekNumberNum > 40) {
    return res.status(400).json({ message: "Invalid week number" });
  }

  const data = {
    week: weekNumberNum,
    daysToBirth: 165,
    baby: {
      size: "як авокадо",
      description: "Ваш малюк активно розвивається"
    },
    momTip: "Пийте більше води та відпочивайте"
  };

  res.json(data);
};