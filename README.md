# Online Reminder System
The Online Reminder System is a full-stack web application that allows users to create, manage, and receive reminders via email notifications. Users can sign up, log in, create reminders, and view upcoming reminders. When the scheduled time for a reminder arrives, the system sends an email notification to the user.

## Features:

- User Authentication

- Create Reminders: Add reminders with a title, description, and date/time.

- View Upcoming Reminders: See a list of upcoming reminders.

- Email Notifications: Receive email reminders at the scheduled time.

## Tech Stack
### Frontend

- React
- Axios
- React Router

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Nodemailer
- Bcrypt.js

### Deployment
- Render: Hosting for backend (Web Service) and frontend (Static Site).
- MongoDB Atlas: Cloud database service.


## API Endpoints
### Authentication:
- POST /api/auth/signup: Register a new user.
- POST /api/auth/login: Log in an existing user.

### Reminders:
- POST /api/reminders: Create a new reminder (protected).
- GET /api/reminders: Fetch all reminders for the logged-in user (protected).

## Environment Variables
### Backend
    
    MONGO_URI:              MongoDB connection string.
    JWT_SECRET:             Secret key for JWT.
    PORT:                   Port for the backend server.
    BREVO_SMTP_LOGIN:       BREVO SMTP login (email).
    BREVO_SMTP_PASSWORD:    BREVO SMTP password.
    BREVO_SMTP_HOST:        BREVO SMTP host (smtp-relay.brevo.com).
    BREVO_SMTP_PORT:        BREVO SMTP port (587).

    Get SMTP Credentials from https://www.brevo.com/
    The app uses BREVO SMTP for sending email notifications. 

### Frontend
    REACT_APP_API_URL: Base URL for backend API.