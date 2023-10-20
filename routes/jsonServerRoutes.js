const config = require('../config');
const checkAuthMiddleware = require('../middleware/checkAuthMiddleware');
const jsonServer = require('json-server');

const router = jsonServer.router(config.dbFilePath);

console.log(config.AUTH_READ, config.AUTH_WRITE);

if (config.AUTH_READ) {
  router.get(/^\//, checkAuthMiddleware);
}

if (config.AUTH_WRITE) {
  router.put('/', checkAuthMiddleware);
  router.post('/', checkAuthMiddleware);
  router.delete('/', checkAuthMiddleware);
}

module.exports = router;
