const express = require('express');
const checkAuthMiddleware = require('../middleware/checkAuthMiddleware');
const getCurrentUser = require('../controllers/usersController');

const router = express.Router();

router.get('/me', checkAuthMiddleware, getCurrentUser);

module.exports = router;
