const express = require('express');
const uploadController = require('../controllers/uploadController');
const checkAuthMiddleware = require('../middleware/checkAuthMiddleware');
const multerMiddleware = require('../middleware/multerMiddleware');
const fileValidationMiddleware = require('../middleware/fileValidationMiddleware');
const router = express.Router();

router.post(
  '/',
  checkAuthMiddleware,
  multerMiddleware().single('file'),
  fileValidationMiddleware,
  uploadController
);

module.exports = router;
