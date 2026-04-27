const DAY_MS = 24 * 60 * 60 * 1000;
const BIRTH_WEEK = 40;
const MAX_SUPPORTED_WEEK = 42;

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
  const rawDaysUntilDueDate = Math.ceil(
    (due.getTime() - today.getTime()) / DAY_MS,
  );

  const daysUntilDueDate = Math.max(0, rawDaysUntilDueDate);
  const weeksLeft = Math.max(0, Math.ceil(daysUntilDueDate / 7));

  let currentWeek;

  if (rawDaysUntilDueDate >= 0) {
    currentWeek = BIRTH_WEEK - Math.ceil(rawDaysUntilDueDate / 7);
  } else {
    currentWeek = BIRTH_WEEK + Math.ceil(Math.abs(rawDaysUntilDueDate) / 7);
  }

  if (currentWeek < 1) currentWeek = 1;
  if (currentWeek > MAX_SUPPORTED_WEEK) currentWeek = MAX_SUPPORTED_WEEK;

  return {
    currentWeek,
    daysUntilDueDate,
    weeksLeft,
  };
};
