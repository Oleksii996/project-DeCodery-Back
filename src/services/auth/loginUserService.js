import createHttpError from "http-errors";
import { User } from "../../models/user.js";
import bcrypt from "bcrypt";
import { getPregnancyProgress } from "../../utils/getPregnancyProgress.js";

export const loginService = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(401, "Invalid credentials");
  }
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw createHttpError(401, "Invalid credentials");
  }

  const pregnancyProgress = getPregnancyProgress(user.dueDate);
  return {
    user,
    pregnancyProgress,
  };
};
