import createHttpError from "http-errors";
// TODO: uncomment after the auth owner adds user/session models.
// import { User } from "../models/user.js";
// import { Session } from "../models/session.js";

export const authenticate = async (req, res, next) => {
  try {
    next(
      createHttpError(
        501,
        "Authenticate middleware is waiting for user/session models",
      ),
    );
  } catch (error) {
    next(error);
  }
};
