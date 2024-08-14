import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Signup.css'; // Make sure to import your CSS file

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [failedMessage, setFailedMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6; // Password must be at least 6 characters long
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setFailedMessage('Invalid email address.');
      return;
    }

    if (!validatePassword(password)) {
      setFailedMessage('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setFailedMessage('Passwords do not match.');
      return;
    }

    if (!termsAccepted) {
      setFailedMessage('You must accept the terms and conditions.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/users/signup', {
        firstName,
        lastName,
        email,
        password,
      });

      console.log('Response data:', response.data);
      setSuccessMessage('Sign-up successful! Redirecting to login page...');
      setTimeout(() => {
        navigate('/login'); // Redirect to login page
      }, 1000);
    } catch (error) {
      if (error.response) {
        console.log('Error data:', error.response.data);
        setFailedMessage(error.response.data.message || 'Sign-up failed.');
      } else if (error.request) {
        console.error('Error request:', error.request);
        setFailedMessage('Sign-up failed: Network error or server not responding.');
      } else {
        console.error('Error message:', error.message);
        setFailedMessage('Sign-up failed: An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-page">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              className="sign-input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="Enter your first name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              className="sign-input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="Enter your last name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="sign-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="sign-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="sign-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
            />
          </div>
          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="termsAccepted"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
            />
            <label htmlFor="termsAccepted" className="terms-checkbox">
              <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="signup-link">I accept the terms and conditions</a>
            </label>
          </div>
          <button type="submit" className="sign-button" disabled={loading}>
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
          {successMessage && <p className="text-success">{successMessage}</p>}
          {failedMessage && <p className="text-danger">{failedMessage}</p>}
          <p className="signup-link">
            Already have an account? <Link to="/login" className="signup-link">Log in here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
