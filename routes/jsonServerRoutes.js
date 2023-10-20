const config = require('../config');
const checkAuth = require('../middleware/checkAuthMiddleware');
const jsonServer = require('json-server');

const router = jsonServer.router(config.dbFilePath);

if (config.AUTH_READ) {
  router.get(/^\//, checkAuth);
}

if (config.AUTH_WRITE) {
  router.put('/', checkAuth);
  router.post('/', checkAuth);
  router.delete('/', checkAuth);
}

module.exports = router;
