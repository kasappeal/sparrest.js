const config = require('../config');
const {
  userExists,
  encryptPassword,
  getAuthenticatedUser,
  createToken,
  createFolder,
} = require('../utils');
const jsonServer = require('json-server');

const router = jsonServer.router(config.dbFilePath);

const login = (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const authenticatedUser = getAuthenticatedUser(username, password);
    if (!authenticatedUser) {
      const status = 401;
      const message = 'Wrong username/password';
      return res.status(status).json({ message });
    }
    const accessToken = createToken({
      userId: authenticatedUser.id,
      username: authenticatedUser.username,
    });

    return res.status(201).json({ accessToken });
  }
  return res.status(400).json({ message: 'username and password needed.' });
};

const register = async (req, res, next) => {
  const { username, password } = req.body;
  if (username && password) {
    if (userExists(username)) {
      return res.status(400).json({ message: 'Username is taken' });
    }
    req.url = '/users/';
    req.body.password = encryptPassword(password);
    await createFolder(username);
    router.handle(req, res, next);
    return res;
  }
  return res.status(400).json({ message: 'username and password needed.' });
};

module.exports = { login, register, router };
