const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const scheduleReminders = require('./services/reminderScheduler');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require('./routes/auth');
const reminderRoutes = require('./routes/reminders');
app.use('/api/auth', authRoutes);
app.use('/api/reminders', reminderRoutes);

// Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    scheduleReminders();
  })
  .catch(err => console.log("MongoDB error:", err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));