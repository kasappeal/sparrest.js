const fs = require('fs');
const config = require('../config/config');

const getDB = () => {
  const fileContents = fs.readFileSync(config.dbFilePath);
  return JSON.parse(fileContents);
};

module.exports = getDB;
