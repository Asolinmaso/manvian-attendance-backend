// routes/projectRoutes.js

const express = require('express');
const { authenticateJWT } = require('../middleware/authMiddleware');
const { createProject, getAllProjects, updateProject } = require('../controllers/projectController');
const router = express.Router();

// Route to create a new project
router.post('/', authenticateJWT, createProject);

// Route to get all projects
router.get('/', authenticateJWT, getAllProjects);

// Route to update an existing project by ID
router.put('/:id', authenticateJWT, updateProject);

module.exports = router;
