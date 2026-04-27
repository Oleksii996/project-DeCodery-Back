export const getPregnancyProgress = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);

  const diffInMs = due - today;

  const daysUntilDueDate = Math.max(
    0,
    Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  );

  const passedDays = 280 - daysUntilDueDate;

  const currentWeek = Math.max(
    1,
    Math.min(42, Math.floor(passedDays / 7))
  );

  const weeksLeft = Math.max(0, 42 - currentWeek);

  return {
    currentWeek,
    daysUntilDueDate,
    weeksLeft,
  };
};