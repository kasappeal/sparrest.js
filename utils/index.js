const { createToken, verifyToken } = require('./JWT');
const userExists = require('./userExists');
const getUsers = require('./getUsers');
const encryptPassword = require('./encryptPassword');

module.exports = {
  createToken,
  verifyToken,
  userExists,
  getUsers,
  encryptPassword,
};
