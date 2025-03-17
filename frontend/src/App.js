import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import ReminderForm from './components/ReminderForm';
import ReminderList from './components/ReminderList';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLoggedIn(true);
  }, []);

  return (
    <div className="App">
      <h1 className="text-center" >Reminder System</h1>
      {!isLoggedIn ? (
        <Login setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <>
          <ReminderForm />
          <ReminderList />
          <button className="logout-btn secondary-btn"onClick={() => {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
          }}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default App;