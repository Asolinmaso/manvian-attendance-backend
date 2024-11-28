// models/Project.js

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName: { type: String, required: true },
    start: { type: Date, required: true },
    deadline: { type: Date, required: true },
    priority: { type: String, required: true },
    status: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who created the project

}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
