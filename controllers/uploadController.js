const multer = require('multer');
const config = require('../config');
const storage = require('../middleware/multerMiddleware');

const uploadFile = (req, res) => {
  const upload = multer({ storage }).single('file');
  upload(req, res, function (err) {
    if (req.fileValidationError) {
      return res.status(400).json({ message: req.fileValidationError });
    } else if (!req.file) {
      return res.status(400).json({ message: 'file field is required' });
    } else if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err });
    } else if (err) {
      return res.status(400).json({ message: err });
    }
    const path = `${req.protocol}://${req.get('host')}/${req.file.path
      .replace(config.UPLOAD_FOLDER, '')
      .replace('\\', '/')
      .replace('//', '/')}`;
    return res.status(201).json({ path });
  });
};

module.exports = uploadFile;
