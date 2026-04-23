import { Schema, model } from "mongoose";

const momStateSchema = new Schema({});

export const momStateModel = model("mom_state", momStateSchema);
