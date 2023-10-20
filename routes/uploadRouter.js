const express = require('express');
const uploadController = require('../controllers/uploadController');
const checkAuthMiddleware = require('../middleware/checkAuthMiddleware');
const multerMiddleware = require('../middleware/multerMiddleware');
const router = express.Router();

router.post(
  '/upload',
  checkAuthMiddleware,
  multerMiddleware().single('file'),
  uploadController
);

module.exports = router;
