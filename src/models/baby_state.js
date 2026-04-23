import { Schema, model } from "mongoose";

const babyStateSchema = new Schema({});

export const babyStateModel = model("baby_state", babyStateSchema);
