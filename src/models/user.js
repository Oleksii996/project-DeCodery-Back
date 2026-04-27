import { model, Schema } from "mongoose";
import { BABY_GENDER } from "../constants/babyGender.js";

const userSchema = new Schema({
  name: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true, unique: true },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  gender: { type: String, enum: BABY_GENDER },
  dueDate: { type: Date, required: true },
  avatar: {
    type: String,
    default: "https://ac.goit.global/fullstack/react/default-avatar.jpg",
  },
});

export const User = model("User", userSchema);
