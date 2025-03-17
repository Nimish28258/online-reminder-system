const cron = require('node-cron');
const Reminder = require('../models/Reminder');
const User = require('../models/User');
const { sendReminderEmail } = require('../utils/emailSender');

const scheduleReminders = () => {
  // Run every minute
  cron.schedule('* * * * *', async () => {
    try {
      const now = new Date();
      const reminders = await Reminder.find({
        date: { $lte: now.toISOString() },
        isSent: false
      }).populate('user');

      for (const reminder of reminders) {
        await sendReminderEmail(
          reminder.user.email,
          reminder.title,
          reminder.description
        );
        
        reminder.isSent = true;
        await reminder.save();
      }
    } catch (error) {
      console.error('Error in reminder scheduler:', error);
    }
  });
};

module.exports = scheduleReminders;