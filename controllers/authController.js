const {
  userExists,
  encryptPassword,
  getAuthenticatedUser,
  createToken,
} = require('../utils');

const router = require('../routes/jsonServerRoutes');

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

const register = (req, res, next) => {
  const { username, password } = req.body;
  if (username && password) {
    if (userExists(username)) {
      return res.status(400).json({ message: 'Username is taken' });
    }
    req.url = '/users/';
    req.body.password = encryptPassword(password);
    router.handle(req, res, next);
    return res;
  }
  return res.status(400).json({ message: 'username and password needed.' });
};

module.exports = { login, register, router };
