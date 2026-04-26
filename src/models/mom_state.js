import { Schema, model } from "mongoose";

const momStateSchema = new Schema({
  weekNumber: Number,
  tip: String,
  feelings: [String],
});

export const momStateModel = model("mom_state", momStateSchema);