import Task from "../../models/task.js";

export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Задача не знайдена" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Помилка оновлення статусу" });
  }
};