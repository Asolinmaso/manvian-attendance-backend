const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use('/auth', authRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
