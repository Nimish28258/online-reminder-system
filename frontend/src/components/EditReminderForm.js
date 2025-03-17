import React, { useState, useEffect } from 'react';

const EditReminderForm = ({ reminder, onUpdate }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (reminder) {
      setTitle(reminder.title);
      setDescription(reminder.description);
      setDate(new Date(reminder.date).toISOString().slice(0, 16));
    }
  }, [reminder]);

  if (!reminder) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onUpdate(reminder._id, {
        title,
        description,
        date: new Date(date)
      });
      setShowEditForm(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="edit-form-container">
      <button
        className={`secondary-btn ${showEditForm ? 'cancel-btn' : ''}`}
        onClick={() => setShowEditForm(!showEditForm)}
        type="button"
      >
        {showEditForm ? '✕ Cancel' : '✎ Edit'}
      </button>

      {showEditForm && (
        <form className="edit-form" onSubmit={handleSubmit}>
          <label>
            Title
            <input
              type="text"
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>

          <div className="flex-between">
            <button
              type="button"
              className="secondary-btn"
              onClick={() => setShowEditForm(false)}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="primary-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditReminderForm;