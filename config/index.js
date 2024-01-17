const path = require('path');
const bcrypt = require('bcrypt');

const { get } = require('env-var');

const config = {
  UPLOAD_FOLDER: get('UPLOAD_FOLDER').default('../public/uploads').asString(),
  AUTH_READ: get('AUTH_READ').default('yes').asString(),
  AUTH_WRITE: get('AUTH_WRITE').default('no').asString(),
  SECRET_KEY: get('SECRET_KEY').default('Annie is Vader').asString(),
  JWT_EXPIRATION: get('JWT_EXPIRATION').default('24h').asString(),
  PORT: get('PORT').default(8000).asPortNumber(),
  SALT: bcrypt.genSaltSync(Number(get('SALT')) || 10),
  DB_RESOURCES: get('DB_RESOURCES').default('tweets').asString(),
  dbFileName: get('DB_FILE').default('db.json').asString(),
};

config.dbFilePath = path.posix.join(
  __dirname,
  '..',
  'database',
  config.dbFileName
);

module.exports = config;
