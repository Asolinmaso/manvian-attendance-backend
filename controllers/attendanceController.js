const Attendance = require('../models/Attendance');

// Create Attendance
exports.createAttendance = async (req, res) => {
    try {
        const { type, status, location, actionTime, leaveType, startDate, endDate, description } = req.body;

        let attendanceData = {
            type,
            user: req.user.id, // Get user ID from JWT
        };

        if (type === 'check-in/out') {
            attendanceData.status = status;
            attendanceData.location = location;
            attendanceData.actionTime = actionTime;
        } else if (type === 'leave') {
            attendanceData.leaveType = leaveType;
            attendanceData.startDate = startDate;
            attendanceData.endDate = endDate;
            attendanceData.description = description || '';
        } else {
            return res.status(400).json({ error: 'Invalid attendance type' });
        }

        const attendance = new Attendance(attendanceData);
        await attendance.save();

        res.status(201).json({ message: 'Attendance recorded successfully', attendance });
    } catch (error) {
        res.status(500).json({ error: 'Error recording attendance', details: error.message });
    }
};

// Fetch Attendance Records
exports.getAttendance = async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find({ user: req.user.id });
        res.status(200).json({ attendanceRecords });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching attendance records', details: error.message });
    }
};
