import { taskModel } from "../../models/task.js";

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const updated = await taskModel.findByIdAndUpdate(id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "Task not found" });
  res.json(updated);
};