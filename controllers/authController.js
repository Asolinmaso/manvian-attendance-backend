const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const COOKIE_EXPIRY = 60 * 60 * 24; // 1 day

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'asolinmaso22@gmail.com',
        pass: 'fleh qyzm jmqi umfl'
    }
});

// Generate OTP and expiry time
const generateOTP = () => {
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    return { otp, expiresAt };
};

// Signup function
exports.signup = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const user = new User({ email, password, role });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Signup error' });
    }
};

// Login function with OTP generation
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Verify if the provided password matches the hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }
    const { otp, expiresAt } = generateOTP();
    user.otp = { code: otp, expiresAt };
    await user.save();

    await transporter.sendMail({
        from: 'asolinmaso22@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP is ${otp}. It expires in 10 minutes.`,
    });

    res.status(200).json({ message: 'OTP sent to your email' });
};

// OTP Verification and JWT Generation
exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.otp.code !== otp || user.otp.expiresAt < new Date()) {
        return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, 'manvian', {
        expiresIn: COOKIE_EXPIRY
    });

    res.cookie('token', token, {
        httpOnly: true,
        maxAge: COOKIE_EXPIRY * 1000,
    });

    user.otp = { code: null, expiresAt: null }; // Clear OTP after successful login
    await user.save();

    res.status(200).json({ message: 'Logged in successfully' });
};

const generatePasswordResetOTP = () => {
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes expiry
    return { otp, expiresAt };
};

// Forgot Password - Send OTP
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const { otp, expiresAt } = generatePasswordResetOTP();
    user.otp = { code: otp, expiresAt };
    await user.save();

    await transporter.sendMail({
        from: 'asolinmaso22@gmail.com',
        to: email,
        subject: 'Your Password Reset OTP',
        text: `Your OTP for password reset is ${otp}. It expires in 2 minutes.`,
    });

    res.status(200).json({ message: 'OTP sent to your email for password reset' });
};

// Verify OTP and Reset Password
exports.resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.otp.code !== otp || user.otp.expiresAt < new Date()) {
        return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    user.password = newPassword; // Assign new password directly
    user.otp = { code: null, expiresAt: null }; // Clear OTP after reset
    await user.save(); // 'pre' save hook will handle the hashing

    res.status(200).json({ message: 'Password has been reset successfully' });
};