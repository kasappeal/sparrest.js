const fs = require('fs');
const config = require('../config/config');
const saveDB = (db) => {
  fs.writeFileSync(config.dbFilePath, JSON.stringify(db, null, 2));
};

module.exports = saveDB;
