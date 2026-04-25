import { taskModel } from "../../models/task.js";

export const getTasks = async (req, res) => {
  const tasks = await taskModel.find().sort({ date: 1 });
  res.json(tasks);
};