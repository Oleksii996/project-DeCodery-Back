export const getWeekData = (req, res) => {
  const { weekNumber } = req.params;

  if (isNaN(Number(weekNumber))) {
    return res.status(400).json({ message: "Invalid week number" });
  }

  const data = {
    week: Number(weekNumber),
    daysToBirth: 165,
    baby: {
      size: "як авокадо",
      description: "Ваш малюк активно розвивається"
    },
    momTip: "Пийте більше води та відпочивайте"
  };

  res.json(data);
};