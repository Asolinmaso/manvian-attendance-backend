const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    type: { type: String, enum: ['check-in/out', 'leave'], required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['checked-in', 'checked-out'], required: function () { return this.type === 'check-in/out'; } },
    location: { type: String, required: function () { return this.type === 'check-in/out'; } },
    actionTime: { type: Date, required: function () { return this.type === 'check-in/out'; } },
    leaveType: { type: String, required: function () { return this.type === 'leave'; } },
    startDate: { type: Date, required: function () { return this.type === 'leave'; } },
    endDate: { type: Date, required: function () { return this.type === 'leave'; } },
    description: { type: String }, // Optional description for leave
}, { timestamps: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
