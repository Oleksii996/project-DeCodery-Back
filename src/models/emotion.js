import { Schema, model } from 'mongoose';

const emotionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});

export const Emotion = model('Emotion', emotionSchema);
