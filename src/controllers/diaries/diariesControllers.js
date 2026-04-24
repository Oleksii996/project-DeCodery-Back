import createHttpError from 'http-errors';
import { Diary } from '../../models/diary.js';

export const getAllDiaries = async (req, res) => {
  const diaries = await Diary.find({ userId: req.user._id }).populate(
    'emotions',
    'title',
  );

  res.status(200).json(diaries);
};
export const getDiaryById = async (req, res) => {
  const { diaryId } = req.params;
  const diary = await Diary.findOne({
    _id: diaryId,
    userId: req.user._id,
  }).populate('emotions', 'title');
  if (!diary) {
    throw createHttpError(404, 'Diary not found');
  }
  res.status(200).json(diary);
};
export const createDiary = async (req, res) => {
  const diary = await Diary.create({
    ...req.body,
    userId: req.user._id,
  });
  const populatedDiary = await diary.populate('emotions', 'title');
  res.status(201).json(populatedDiary);
};
export const updateDiary = async (req, res) => {
  const { diaryId } = req.params;
  const diary = await Diary.findOneAndUpdate(
    {
      _id: diaryId,
      userId: req.user._id,
    },
    req.body,
    { returnDocument: 'after' },
  ).populate('emotions', 'title');
  if (!diary) {
    throw createHttpError(404, 'Diary not found');
  }
  res.status(200).json(diary);
};
export const deleteDiary = async (req, res) => {
  const { diaryId } = req.params;
  const diary = await Diary.findOneAndDelete({
    _id: diaryId,
    userId: req.user._id,
  });
  if (!diary) {
    throw createHttpError(404, 'Diary not found');
  }
  res.status(200).json(diary);
};
