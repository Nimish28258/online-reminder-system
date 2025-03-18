import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const ReminderForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const utcDate = moment(date).utc().format();

      await axios.post(`${process.env.REACT_APP_API_URL}/api/reminders`, {
        title,
        description,
        date: utcDate
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setTitle('');
      setDescription('');
      setDate('');
      setShowForm(false);
      alert('Reminder added successfully!');
      window.location.reload();
    } catch (err) {
      alert('Failed to add reminder');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="reminder-form-container">
      <button
        className={`collapse-button primary-btn ${showForm ? 'cancel-btn' : ''}`}
        onClick={() => setShowForm(!showForm)}
        type="button"
      >
        {showForm ? '✕ Close Form' : '＋ Create New Reminder'}
      </button>

      {showForm && (
        <form className="reminder-form" onSubmit={handleSubmit}>
          <label>
            Title
            <input
              type="text"
              placeholder="Meeting with Team"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label>
            Date & Time
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>

          <label>
            Description
            <textarea
              placeholder="Add details about your reminder..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>

          <button 
            type="submit" 
            className="primary-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="loading-spinner" />
                Adding...
              </>
            ) : 'Add Reminder'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ReminderForm;