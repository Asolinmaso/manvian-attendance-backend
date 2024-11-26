const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middleware/authMiddleware');
const { createAttendance, getAttendance } = require('../controllers/attendanceController');

// Record Attendance
router.post('/', authenticateJWT, createAttendance);

// Get Attendance Records
router.get('/', authenticateJWT, getAttendance);

module.exports = router;
