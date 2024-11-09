# Attendance Backend Project

## Table of Contents
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Run the Application](#run-the-application)
- [API Endpoints](#api-endpoints)
  - [POST /auth/signup](#post-authsignup)
  - [POST /auth/login](#post-authlogin)
  - [POST /auth/verify-otp](#post-authverify-otp)
  - [POST /auth/forgot-password](#post-authforgot-password)
  - [POST /auth/reset-password](#post-authreset-password)

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```
## Environment Variables
Create a .env file in the root directory to configure the following variables:
```plaintext
MONGODB_URI=mongodb://localhost:27017/yourDatabaseName
JWT_SECRET=your_jwt_secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
```
```bash
npm start
```

# API Endpoints

## POST /auth/signup
Registers a new user with the specified email, password, and role.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "employee" // or "admin"
}
```

## POST /auth/login
Logs in an existing user and sends a one-time password (OTP) to their email.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

## POST /auth/verify-otp
Verifies the OTP sent to the user's email. If valid, issues a JWT token and stores it in a secure cookie.

**Request Body:**
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

## POST /auth/forgot-password
Initiates a password reset by sending an OTP to the user's email with a 2-minute expiration.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

## POST /auth/reset-password
Verifies the OTP and resets the user's password.

**Request Body**
```json
{
  "email": "user@example.com",
  "otp": "123456",
  "newPassword": "newpassword123"
}
```
