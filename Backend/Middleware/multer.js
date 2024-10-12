// middlewares/upload.js
import multer from "multer";
import path from "path";

const multerUpload = multer({
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const upload = multerUpload.single("avatar");

const attachments = multerUpload.array("files", 5);

export  {upload,attachments};
