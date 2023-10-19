const bcrypt = require('bcrypt');
const config = require('../config/config');

const encryptPassword = (password) => {
  return bcrypt.hashSync(password, config.SALT);
};

module.exports = encryptPassword;
