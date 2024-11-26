const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const workUpdateRoutes = require('./routes/workUpdateRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
connectDB();

// Static folder for uploads
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/auth', authRoutes);
app.use('/workupdates', workUpdateRoutes);
app.use('/attendance', attendanceRoutes);

app.listen("8000")

module.exports = app;
