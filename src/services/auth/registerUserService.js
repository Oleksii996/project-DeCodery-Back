import createHttpError from "http-errors";
import { User } from "../../models/user.js";
import bcrypt from "bcrypt";

export const registerService = async (body) => {
  const { password, ...userProps } = body;
  const user = await User.findOne({ email: body.email });

  if (user) {
    throw createHttpError(401, "This email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    password: hashedPassword,
    ...userProps,
  });

  return newUser;
};
