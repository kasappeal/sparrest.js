const express = require('express');
const uploadController = require('../controllers/uploadController');
const checkAuthMiddleware = require('../middleware/checkAuthMiddleware');
const multerMiddleware = require('../middleware/multerMiddleware');
const fileValidationMiddleware = require('../middleware/fileValidationMiddleware');
const router = express.Router();

const { config } = require('dotenv');

if (config.AUTH_WRITE) {
  router.post(
    '/',
    checkAuthMiddleware,
    multerMiddleware().single('file'),
    fileValidationMiddleware,
    uploadController
  );
}

module.exports = router;
