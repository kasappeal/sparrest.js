const express = require('express');
const uploadController = require('../controllers/uploadController');
const checkAuth = require('../middleware/checkAuthMiddleware');
const router = express.Router();

router.post('/', checkAuth, uploadController);

module.exports = router;
