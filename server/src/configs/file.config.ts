import multer from "multer";

export const avatarImageUpload = multer({
  storage: multer.diskStorage({
    destination: function (_req, _file, cb) {
      cb(null, "src/assets/avatars/");
    },
    filename: function (_req, file, cb) {
      cb(null, new Date().valueOf() + "_" + file.originalname);
    },
  }),
});
