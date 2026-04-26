export const getPregnancyProgress = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);

  const diffInMs = due - today;
  const daysToBirth = Math.max(0, Math.floor(diffInMs / (1000 * 60 * 60 * 24)));

  const passedDays = 280 - daysToBirth;
  const currentWeek = Math.max(1, Math.min(40, Math.floor(passedDays / 7)));

  return {
    currentWeek,
    daysToBirth,
  };
};