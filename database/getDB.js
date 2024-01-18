const fs = require('fs');
const config = require('../config');

const getDB = () => {
  const fileContents = fs.readFileSync(config.dbFilePath);
  return JSON.parse(fileContents);
};

module.exports = getDB;
