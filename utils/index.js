const { createToken, verifyToken } = require('./JWT');
const userExists = require('./userExists');
const getUsers = require('./getUsers');
const encryptPassword = require('./encryptPassword');
const getAuthenticatedUser = require('./getAuthenticatedUser');
const createFolder = require('./createFolder');
module.exports = {
  createToken,
  verifyToken,
  userExists,
  getUsers,
  encryptPassword,
  getAuthenticatedUser,
  createFolder,
};
