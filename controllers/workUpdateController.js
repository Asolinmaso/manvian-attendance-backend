const WorkUpdate = require('../models/WorkUpdate');
const multer = require('multer');
const path = require('path');

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Create Work Update
exports.createWorkUpdate = async (req, res) => {
    try {
        const { projectName, startDate, deadline, deadlineTime, status } = req.body;
        const filePath = req.file ? req.file.path : null;

        const workUpdate = new WorkUpdate({
            projectName,
            startDate,
            deadline,
            deadlineTime,
            status,
            filePath,
            createdBy: req.user.id, // Get the user ID from the JWT payload
        });

        await workUpdate.save();
        res.status(201).json({ message: 'Work update created successfully', workUpdate });
    } catch (error) {
        res.status(500).json({ error: 'Error creating work update', details: error.message });
    }
};

// Fetch Work Updates
exports.getWorkUpdates = async (req, res) => {
    try {
        const workUpdates = await WorkUpdate.find({ createdBy: req.user.id });
        res.status(200).json({ workUpdates });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching work updates', details: error.message });
    }
};

// Export Multer middleware
exports.uploadMiddleware = upload.single('file');
