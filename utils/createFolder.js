const path = require('path');
const fs = require('fs/promises');
const config = require('../config');

const createFolder = async (username) => {
  const uploadPath = path.join(
    __dirname,
    `${config.UPLOAD_FOLDER}/${username}`
  );
  try {
    await fs.mkdir(uploadPath, { recursive: true });
    console.log(`Folder for user: ${username} created`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = createFolder;
