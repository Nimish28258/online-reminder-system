import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import EditReminderForm from './EditReminderForm';



const ReminderList = () => {
  const [reminders, setReminders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/reminders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReminders(res.data);
      setError('');
    } catch (err) {
      setError('Failed to load reminders. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this reminder?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/reminders/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReminders(prev => prev.filter(reminder => reminder._id !== id));
    } catch (err) {
      alert('Failed to delete reminder');
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/reminders/${id}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReminders(prev => prev.map(reminder => 
        reminder._id === id ? res.data : reminder
      ));
    } catch (err) {
      alert('Failed to update reminder');
    }
  };

  return (

    <div className="reminder-list">
      <div className="list-header flex-between">
        <h3>Your Reminders</h3>
        <span className="badge">{reminders.length} items</span>
      </div>

      {error && <div className="error-message">{error}</div>}

      {isLoading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading reminders...</p>
        </div>

      ) : reminders.length === 0 ? (
        <div className="empty-state">
          <img src="/calendar-illustration.svg" alt="No reminders" />
          <p>No reminders found. Time to create your first one!</p>
        </div>

            ) : (
        reminders.map(reminder => (
          <div key={reminder._id} className="reminder-card">
            <div className="card-content">
              <h4>{reminder.title}</h4>
              <div className="reminder-meta">
                <time>
                  <i className="icon-clock"></i>
                  {moment.utc(reminder.date).local().format("YYYY-MM-DD   hh:mm A")}
                </time>
                <span className={`status ${reminder.isSent ? 'sent' : 'pending'}`}>
                  {reminder.isSent ? 'Sent' : 'Pending'}
                </span>
              </div>
              <p className="description">{reminder.description}</p>
            </div>

            <div className="reminder-actions">
              <button 
                onClick={() => handleDelete(reminder._id)}
                className="danger-btn action-btn"
                aria-label="Delete reminder"
              >
                <i className="icon-trash"></i>
                <span className="btn-text">Delete</span>
              </button>
              <EditReminderForm 
                reminder={reminder} 
                onUpdate={handleUpdate}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};
export default ReminderList;