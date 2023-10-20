const bcrypt = require('bcrypt');
const getUsers = require('./getUsers');
const config = require('../config');

const getAuthenticatedUser = (username, password) => {
  // eslint-disable-next-line no-unused-vars
  const encryptedPassword = bcrypt.hashSync(password, config.SALT);
  const users = getUsers();
  const user = users.find((user) => user.username === username);
  if (user && bcrypt.compareSync(password, user.password)) {
    return user;
  }
  return null;
};

module.exports = getAuthenticatedUser;
