import { taskModel } from "../../models/task.js";

export const createTask = async (req, res) => {
  const { task, date } = req.body;
  const newTask = await taskModel.create({ task, date });
  res.status(201).json(newTask);
};