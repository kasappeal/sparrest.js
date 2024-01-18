const multer = require('multer');

const validateUploadedFiles = (err, req, res, next) => {
  if (req.fileValidationError) {
    return res.status(400).json({ message: req.fileValidationError });
  } else if (!req.file) {
    return res.status(400).json({ message: 'file field is required' });
  } else if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err });
  } else if (err) {
    return res.status(400).json({ message: err });
  }

  next();
};

module.exports = validateUploadedFiles;
