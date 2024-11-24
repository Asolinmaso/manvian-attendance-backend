const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middlewares/authMiddleware');
const { createWorkUpdate, getWorkUpdates, uploadMiddleware } = require('../controllers/workUpdateController');

// Create work update
router.post('/', authenticateJWT, uploadMiddleware, createWorkUpdate);

// Get work updates
router.get('/', authenticateJWT, getWorkUpdates);

module.exports = router;
