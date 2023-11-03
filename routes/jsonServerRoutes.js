const jsonServer = require('json-server');

const checkAuthMiddleware = require('../middleware/checkAuthMiddleware');
const config = require('../config');
const router = jsonServer.router(config.dbFilePath);

if (config.AUTH_READ) {
  router.use('/', checkAuthMiddleware);
}

if (config.AUTH_WRITE) {
  router.put('/', checkAuthMiddleware);
  router.post('/', checkAuthMiddleware);
  router.delete('/', checkAuthMiddleware);
}

module.exports = router;
