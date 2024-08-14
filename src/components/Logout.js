import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css';

const Logout = ({ setAuth }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(false); // Clear authentication state
    navigate('/login');
  };

  return (
    <div className="logout-container">
      <h1>Logout</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
