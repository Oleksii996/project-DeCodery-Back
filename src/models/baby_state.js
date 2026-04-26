import { Schema, model } from "mongoose";

const babyStateSchema = new Schema({
  weekNumber: Number,
  size: String,
  description: String,
  facts: [String],
});

export const babyStateModel = model("baby_state", babyStateSchema);