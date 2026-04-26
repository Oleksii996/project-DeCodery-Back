import multer from "multer";
import createHttpError from "http-errors";

const storage = multer.memoryStorage();

const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

export const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(
        createHttpError(
          400,
          "Invalid file type. Allowed types: jpeg, png, webp",
        ),
      );
    }

    cb(null, true);
  },
});
