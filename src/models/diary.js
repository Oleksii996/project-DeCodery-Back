import { Schema, model } from 'mongoose';

const diarySchema = new Schema(
  {
    title: {
      type: String,
      min: 1,
      max: 64,
      required: true,
    },
    description: {
      type: String,
      min: 1,
      max: 1000,
      required: true,
    },
    date: {
      type: String,
      default: () => new Date().toISOString().split('T')[0],
    },
    emotions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Emotion',
        required: true,
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
export const Diary = model('Diary', diarySchema);
