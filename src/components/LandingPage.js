import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <header className="header">
        <div className="logo">
          <h1>Cashon</h1>
        </div>
        <nav className="nav">
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/features" className="nav-link">Features</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/login" className="nav-link login-button">Login</Link>
        </nav>
      </header>

      <div className="hero-section">
        <h2>Manage Your Finances Effortlessly</h2>
        <p>Cashon helps you keep track of your expenses and income, providing you with the tools to manage your budget effectively.</p>
        <Link to="/signup" className="cta-button">Get Started</Link>
      </div>

      <div className="features-section">
        <h3>Why Choose Cashon?</h3>
        <div className="features">
          <div className="feature">
            <h4>Track Expenses</h4>
            <p>Keep an eye on where your money is going.</p>
          </div>
          <div className="feature">
            <h4>Set Budgets</h4>
            <p>Set and manage your budgets with ease.</p>
          </div>
          <div className="feature">
            <h4>Financial Insights</h4>
            <p>Get detailed reports on your financial health.</p>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>© 2024 Cashon. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
