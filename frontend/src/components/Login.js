import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isSignup ? '/signup' : '/login';
      const payload = isSignup ? { name, email, password } : { email, password };
      
      const res = await axios.post(`http://localhost:5000/api/auth${endpoint}`, payload);
      if (!isSignup) {
        localStorage.setItem('token', res.data.token);
        setIsLoggedIn(true);
      }
      alert(isSignup ? 'Account created!' : 'Logged in!');
    } catch (err) {
      alert(err.response?.data?.error || 'Error');
    }
  };

  return (
    <div className="auth-form">
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="primary-btn">{isSignup ? 'Sign Up' : 'Login'}</button>
      </form>
      <button className="secondary-btn" onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? 'Switch to Login' : 'Create Account'}
      </button>
    </div>
  );
};

export default Login;