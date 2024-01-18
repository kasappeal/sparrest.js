const { verifyToken } = require('../utils');

const checkAuth = (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(' ');
    const { err, decode } = verifyToken(token);
    if (err) {
      throw err;
    }
    req.user = {
      userId: decode.userId,
      username: decode.username,
    };
    req.body.userId = decode.userId;
    if (req.method === 'POST' || req.method === 'PUT') {
      req.body.updatedAt = new Date().toISOString();
    }
    return next();
  } catch (err) {
    console.log(err);
    const status = 401;
    const message = 'Wrong access token';
    return res.status(status).json({ status, message });
  }
};

module.exports = checkAuth;
