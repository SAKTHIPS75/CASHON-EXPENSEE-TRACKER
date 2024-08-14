// Profile.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import Navbar from './Navbar';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    balance: 1200.00,
  });

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/edit-profile');
  };

  return (
    <div className="profile-container">
       <Navbar/>
      <div className="profile-header">
        <h1>Profile</h1>
      </div>
      <div className="profile-card">
        <div className="profile-info">
          <div className="profile-item">
            <label>Name:</label>
            <p>{user.name}</p>
          </div>
          <div className="profile-item">
            <label>Email:</label>
            <p>{user.email}</p>
          </div>
          <div className="profile-item">
            <label>Balance:</label>
            <p>₹{user.balance.toFixed(2)}</p>
          </div>
        </div>
        <button className="edit-button" onClick={handleEdit}>Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
