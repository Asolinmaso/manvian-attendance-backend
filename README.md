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
  - [POST /work-updates](#post-work-updates)
  - [GET /work-updates](#get-work-updates)
  - [POST /projects](#post-projects)
  - [GET /projects](#post-projects)
  - [PUT /projects/:id](#post-projects-id)

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


## POST /work-updates
Creates a new work update. This endpoint requires JWT authentication and allows file uploads.

**Request Body**:
Content-Type: multipart/form-data
```json
{
  "projectName": "Project Alpha",       
  "startDate": "2024-11-01T09:00:00Z",  // Start date of the work update (ISO format)
  "deadline": "2024-11-30T18:00:00Z",  // Deadline date (ISO format)
  "deadlineTime": "17:00",              // Deadline time (HH:mm format)
  "status": "in progress",              // Status of the work update (in progress or completed)
  "file": "file_path_here"              // Optional file attached (multipart upload)
}
```

## GET /work-updates
Fetches all work updates created by the logged-in user for a specific date. This endpoint requires JWT authentication.

## Query Parameters:
```plaintext
date (required): The date for which to fetch work updates (format: YYYY-MM-DD).
```
## GET /work-updates?date=2024-11-01
```json
{
  "workUpdates": [
    {
      "id": "work-update-id",
      "projectName": "Project Alpha",
      "startDate": "2024-11-01T09:00:00Z",
      "deadline": "2024-11-30T18:00:00Z",
      "deadlineTime": "17:00",
      "status": "in progress",
      "filePath": "uploads/filename.ext",
      "createdBy": "user-id",
      "createdAt": "2024-11-01T10:00:00Z",
      "updatedAt": "2024-11-01T10:00:00Z"
    }
  ]
}
```

## POST /projects
Creates a new project. This endpoint requires JWT authentication.

**Request Body**
```json
{
  "projectName": "Project Alpha",
  "start": "2024-11-01T09:00:00Z",   // Start date of the project (ISO format)
  "deadline": "2024-12-01T18:00:00Z",   // Deadline of the project (ISO format)
  "priority": "High",    // Priority level of the project (Low, Medium, High)
  "status": "In Progress"  // Current status of the project (Planned, In Progress, Completed)
}
```
## GET /projects
Get all Projects for the loggedin user

## PUT /projects/:id
Updates an existing project by ID. This endpoint requires JWT authentication.

Request Body:
```json
{
  "projectName": "Updated Project Alpha",
  "start": "2024-11-01T09:00:00Z",  // Updated start date (ISO format)
  "deadline": "2024-12-10T18:00:00Z",  // Updated deadline (ISO format)
  "priority": "Medium",    // Updated priority (Low, Medium, High)
  "status": "Completed"    // Updated status (Planned, In Progress, Completed)
}
```



















