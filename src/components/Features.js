import React from 'react';
import './Features.css';

const Features = () => {
  return (
    <div className="features-container">
      <h2>Features</h2>
      <div className="feature-list">
        <div className="feature-item">
          <h3>Expense Tracking</h3>
          <p>Monitor all your expenses in one place.</p>
        </div>
        <div className="feature-item">
          <h3>Budget Management</h3>
          <p>Create and manage your budgets with ease.</p>
        </div>
        <div className="feature-item">
          <h3>Secure Data</h3>
          <p>All your data is encrypted and secure.</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
