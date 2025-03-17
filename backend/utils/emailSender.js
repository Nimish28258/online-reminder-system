const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: process.env.BREVO_SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_LOGIN,
    pass: process.env.BREVO_SMTP_PASSWORD
  }
});

exports.sendReminderEmail = async (to, title, description) => {
  try {
    await transporter.sendMail({
      from: '"Reminder System" <rookeplayer1@gmail.com>',
      to,
      subject: `Reminder: ${title}`,
      html: `
        <h2>${title}</h2>
        <p>${description}</p>
        <p><em>This is an automated reminder</em></p>
      `
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};