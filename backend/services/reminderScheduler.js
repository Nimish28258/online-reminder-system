const cron = require('node-cron');
const Reminder = require('../models/Reminder');
const User = require('../models/User');
const { sendReminderEmail } = require('../utils/emailSender');
const moment = require('moment-timezone');

const scheduleReminders = () => {
  // Run every minute
  cron.schedule('* * * * *', async () => {
    try {
      const nowDate =  moment().utc().format();
      const reminders = await Reminder.find({
        date: { $lte: nowDate },
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