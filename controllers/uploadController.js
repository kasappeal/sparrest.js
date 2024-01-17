const path = require('path');

const uploadFile = (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'File is required' });

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
