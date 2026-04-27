import { model, Schema } from "mongoose";

const sessionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    refreshTokenValidUntil: { type: Date, required: true },
    accessTokenValidUntil: { type: Date, required: true },
  },
  { timestamps: true },
);
export const Session = model("Session", sessionSchema);
