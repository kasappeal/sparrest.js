const getUsers = require('./getUsers');

const userExists = (username) => {
  const users = getUsers();
  const findedUser = users.find((user) => user.username === username) || null;
  return findedUser;
};

module.exports = userExists;
