import { Schema, model } from "mongoose";

const emotionSchema = new Schema({});

export const emotionModel = model("emotion", emotionSchema);
