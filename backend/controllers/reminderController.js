const Reminder = require('../models/Reminder');

exports.createReminder = async (req, res) => {
  try {
    const reminder = new Reminder({ ...req.body, user: req.user });
    await reminder.save();
    res.status(201).json(reminder);
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
};

exports.getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ user: req.user });
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndUpdate(
      { _id: req.params.id, user: req.user }, // Ensure user owns the reminder
      req.body,
      { new: true } // Return updated document
    );

    if (!reminder) return res.status(404).json({ error: "Reminder not found" });
    res.json(reminder);
  } catch (err) {
    res.status(400).json({ error: "Update failed" });
  }
};

exports.deleteReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndDelete({
      _id: req.params.id,
      user: req.user
    });

    if (!reminder) return res.status(404).json({ error: "Reminder not found" });
    res.json({ message: "Reminder deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
