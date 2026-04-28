import createHttpError from "http-errors";
export const authenticate = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(createHttpError(401, "Unauthorized"));
    }

    next();
  } catch (error) {
    next(error);
  }
};
