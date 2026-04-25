import createHttpError from "http-errors";
import { User } from "../../models/user.js";
import { saveFileToCloudinary } from "../../utils/saveFileToCloudinary.js";

export const updateUserAvatar = async (req, res, next) => {
  if (!req.file) {
    throw createHttpError(400, 'No file');
  }
  const result = await saveFileToCloudinary(req.file.buffer);
  const user = await User.findOneAndUpdate(
    {
      _id: req.user._id,
    },
    { avatar: result.secure_url },
    { returnDocument: 'after' },
  );
  res.status(200).json({ url: user.avatar });
};