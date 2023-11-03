const multer = require('multer');
const config = require('../config');
const path = require('path');

const fileUpload = () => {
  const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
      const newPath = path.posix.join(
        __dirname,
        config.UPLOAD_FOLDER,
        req.user.username
      );
      cb(null, newPath);
    },
    filename: (_req, file, cb) => {
      const fileName = Date.now() + file.originalname;
      cb(null, fileName);
    },
  });

  return multer({ storage });
};

module.exports = fileUpload;
