import { Schema, model } from "mongoose";

const babyStateSchema = new Schema(
  {
    weekNumber: { type: Number, required: true, unique: true },
    analogy: { type: String, default: null },
    babySize: { type: Number, default: 0 },
    babyWeight: { type: Number, default: 0 },
    image: { type: String, required: true },
    babyActivity: { type: String, required: true },
    babyDevelopment: { type: String, required: true },
    interestingFact: { type: String, required: true },
    momDailyTips: { type: [String], default: [] },
  },
  {
    versionKey: false,
    collection: "baby_states",
  },
);

export const babyStateModel = model("baby_state", babyStateSchema);
