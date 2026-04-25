import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  task: { type: String, required: true },
  date: { type: String, required: true },
});

export const taskModel = model("task", taskSchema);