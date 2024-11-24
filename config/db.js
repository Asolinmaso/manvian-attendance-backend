const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://asolin:Aditishasha22@cluster0.gyseh.mongodb.net/Manvian-Attendance?retryWrites=true&w=majority&appName=Cluster0', {
           
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;
