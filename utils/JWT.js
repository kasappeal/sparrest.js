const JWT = require('jsonwebtoken');
const config = require('../config');

const createToken = (payload) =>
  JWT.sign(payload, config.SECRET_KEY, { expiresIn: config.JWT_EXPIRATION });

const verifyToken = (token) =>
  JWT.verify(token, config.SECRET_KEY, (err, decode) => ({ err, decode }));

module.exports = { createToken, verifyToken };
