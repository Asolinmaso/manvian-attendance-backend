const mongoose = require('mongoose');

const workUpdateSchema = new mongoose.Schema({
    projectName: { type: String, required: true },
    startDate: { type: Date, required: true },
    deadline: { type: Date, required: true },
    deadlineTime: { type: String, required: true },
    status: { type: String, enum: ['in progress', 'completed'], required: true },
    filePath: { type: String }, // Store the uploaded file path
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const WorkUpdate = mongoose.model('WorkUpdate', workUpdateSchema);

module.exports = WorkUpdate;
