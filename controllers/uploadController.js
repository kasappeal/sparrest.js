const path = require('path');

const uploadFile = (req, res) => {
  const protocol = req.protocol + '://';
  const host = req.get('host');

  const filePath = path.posix.join(
    'uploads',
    req.user.username,
    req.file.filename
  );
  const url = protocol + host + '/' + filePath;
  res.status(201).json({ path: url });
};

module.exports = uploadFile;
