const DAY_MS = 24 * 60 * 60 * 1000;
const TOTAL_WEEKS = 40;

const normalizeDate = (date) => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
};

export const getPregnancyProgress = (dueDate) => {
  if (!dueDate) {
    return {
      currentWeek: null,
      daysUntilDueDate: null,
      weeksLeft: null,
    };
  }

  const due = normalizeDate(dueDate);

  if (Number.isNaN(due.getTime())) {
    throw new Error("Invalid dueDate");
  }

  const today = normalizeDate(new Date());

  const diffMs = due.getTime() - today.getTime();
  const daysUntilDueDate = Math.ceil(diffMs / DAY_MS);
  const weeksLeft = Math.ceil(daysUntilDueDate / 7);

  let currentWeek = TOTAL_WEEKS - weeksLeft;

  if (currentWeek < 1) currentWeek = 1;
  if (currentWeek > TOTAL_WEEKS) currentWeek = TOTAL_WEEKS;

  return {
    currentWeek,
    daysUntilDueDate,
    weeksLeft: weeksLeft < 0 ? 0 : weeksLeft,
  };
};
