import Task from '../../models/task.js';

export const createTask = async (req, res) => {
  try {
    const { title, date, status = 'pending' } = req.body;

    const task = await Task.create({
      title,
      title,
      date,
      status,
      userId: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Помилка створення задачі' });
  }
};
