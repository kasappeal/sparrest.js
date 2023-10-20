const path = require('path');

const uploadFile = (req, res) => {
  const filePath = path.posix.join(
    '/uploads',
    req.user.username,
    req.file.filename
  );
  res.status(201).json({ path: filePath });
};

module.exports = uploadFile;
