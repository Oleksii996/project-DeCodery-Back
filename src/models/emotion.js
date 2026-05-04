import { Schema, model } from 'mongoose';

const emotionSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
  title: {
    type: String,
    required: true,
  },
});

export const Emotion = model('Emotion', emotionSchema);
