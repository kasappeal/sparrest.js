const path = require('path');
const bcrypt = require('bcrypt');

const UPLOAD_FOLDER = process.env.UPLOAD_FOLDER || '../public/uploads';
const AUTH_READ = process.env.AUTH_READ === 'yes';
const AUTH_WRITE = process.env.AUTH_WRITE !== 'no';
const SECRET_KEY = process.env.SECRET_KEY || 'Annie is Vader';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '24h';
const PORT = process.env.PORT || 7000;
const SALT = bcrypt.genSaltSync(process.env.SALT || 10);

const dbFileName = process.env.DB_FILE || '../database/db.json';
const dbFilePath = path.posix.join(__dirname, dbFileName);

const config = {
  UPLOAD_FOLDER,
  AUTH_READ,
  AUTH_WRITE,
  SECRET_KEY,
  JWT_EXPIRATION,
  PORT,
  SALT,
  dbFileName,
  dbFilePath,
};

module.exports = config;
