import createHttpError from 'http-errors';
import { Emotion } from '../models/emotion.js';

export const getAllEmotions = async (req, res) => {
  const emotions = await Emotion.find();
  if (!emotions) {
    throw createHttpError(404, 'A list of emotions was not found');
  }
  res.status(200).json(emotions);
};

export const getEmotionById = async (req, res) => {
  const { emotionId } = req.params;

  const emotion = Emotion.findOne({ _id: emotionId });
  if (!emotion) {
    throw createHttpError(404, 'Emotion was not found');
  }
  res.status(200).json(emotion);
};
