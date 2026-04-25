import createHttpError from "http-errors";

export const validateImageUpload = (req, res, next) => {
  if (!req.file) {
    return next(createHttpError(400, "Image file is required"));
  }

  next();
};
