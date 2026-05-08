const DAY_MS = 24 * 60 * 60 * 1000;
const TOTAL_WEEKS = 40;
const TOTAL_DAYS = TOTAL_WEEKS * 7;

const normalizeDate = (date) => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
};

export const getDashboardPregnancyProgress = (dueDate) => {
  if (!dueDate) {
    return {
      currentWeek: 1,
      daysUntilDueDate: (TOTAL_WEEKS - 1) * 7,
      dayIndexInWeek: 0,
    };
  }

  const due = normalizeDate(dueDate);

  if (Number.isNaN(due.getTime())) {
    throw new Error("Invalid dueDate");
  }

  const today = normalizeDate(new Date());
  const diffMs = due.getTime() - today.getTime();
  const daysUntilDueDate = Math.ceil(diffMs / DAY_MS);

  const pregnancyDayIndex = Math.min(
    TOTAL_DAYS - 1,
    Math.max(0, TOTAL_DAYS - daysUntilDueDate - 1),
  );

  const currentWeek = Math.floor(pregnancyDayIndex / 7) + 1;
  const dayIndexInWeek = pregnancyDayIndex % 7;

  return {
    currentWeek,
    daysUntilDueDate: Math.max(0, daysUntilDueDate),
    dayIndexInWeek,
  };
};
