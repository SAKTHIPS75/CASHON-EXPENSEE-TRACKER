// EditProfile.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditProfile.css';
import Navbar from './Navbar';

const EditProfile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    balance: 1200.00,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Save the updated profile information (e.g., send to an API or update local state)
    alert('Profile updated successfully!');
    navigate('/profile');
  };

  return (
    <div className="edit-profile-container">
       <Navbar/>
      <div className="edit-profile-header">
        <h1>Edit Profile</h1>
      </div>
      <div className="edit-profile-card">
        <div className="edit-profile-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Balance</label>
            <input
              type="number"
              name="balance"
              value={user.balance}
              onChange={handleChange}
            />
          </div>
          <button className="save-button" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
