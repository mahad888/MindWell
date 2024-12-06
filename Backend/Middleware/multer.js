// middlewares/upload.js
import multer from "multer";
import path from "path";

const multerUpload = multer({
  limits: {
    fileSize: 1024 * 1024 * 50,
  },
});

const multerUploadVideo = multer({
  storage: multer.memoryStorage(), // Store files in memory
  limits: {
    fileSize: 1024 * 1024 * 50, // Limit size to 50MB
  },
});


const upload = multerUpload.single("avatar");
const video = multerUpload.single("video");
const attachments = multerUpload.array("files", 5);

export  {upload,attachments,video};
