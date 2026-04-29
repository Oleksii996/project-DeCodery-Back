import { Schema, model } from "mongoose";

const momStateSchema = new Schema(
  {
    weekNumber: { type: Number, required: true, unique: true },
    feelings: {
      states: { type: [String], default: [] },
      sensationDescr: { type: String, required: true },
    },
    comfortTips: [
      {
        category: { type: String, required: true },
        tip: { type: String, required: true },
      },
    ],
  },
  {
    versionKey: false,
    collection: "mom_states",
  },
);

export const momStateModel = model("mom_state", momStateSchema);
