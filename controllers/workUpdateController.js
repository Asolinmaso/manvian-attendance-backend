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

// Fetch Work Updates by Date
exports.getWorkUpdates = async (req, res) => {
    try {
        const { date } = req.query; // Get the date from query parameter (e.g. '2024-11-27')

        // Validate the date format
        if (!date || isNaN(Date.parse(date))) {
            return res.status(400).json({ error: 'Invalid date format' });
        }

        // Parse the date to match the start of the day (00:00:00)
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        // Parse the date to match the end of the day (23:59:59)
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        // Fetch the work updates created by the user on the given date
        const workUpdates = await WorkUpdate.find({
            createdBy: req.user.id,
            startDate: { $gte: startOfDay, $lte: endOfDay }
        });

        if (workUpdates.length === 0) {
            return res.status(404).json({ message: 'No work updates found for this date' });
        }

        res.status(200).json({ workUpdates });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching work updates', details: error.message });
    }
};


// Export Multer middleware
exports.uploadMiddleware = upload.single('file');
