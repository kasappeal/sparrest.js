const express = require('express');
const uploadController = require('../controllers/uploadController');
const checkAuth = require('../middleware/checkAuthMiddleware');
const multerMiddleware = require('../middleware/multerMiddleware');
const router = express.Router();

router.post(
  '/upload',
  checkAuth,
  multerMiddleware().single('file'),
  uploadController
);

module.exports = router;
