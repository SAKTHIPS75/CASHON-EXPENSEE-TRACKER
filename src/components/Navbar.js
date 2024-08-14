import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaBars, FaChevronDown } from 'react-icons/fa';

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(prevState => !prevState);
  };

  const handleDropdownClick = () => {
    setDropdownOpen(prevState => !prevState);
  };

  return (
    <div className={`navbar-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <nav className="navbar">
        <div 
          className={`sidebar-toggle ${isSidebarOpen ? 'open' : ''}`} 
          onClick={handleSidebarToggle}
        >
          <FaBars />
        </div>
        <div className="navbar-content">
          <div className="navbar-title">CASH_ON</div>
          <ul className="nav-links">
            <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
            <li><Link to="/add-transaction" className="nav-link">Add Transaction</Link></li>
            <li><Link to="/transactions" className="nav-link">Transactions</Link></li>
            <li><Link to="/calculator" className="nav-link">Calculator</Link></li>
            <li><Link to="/calendar" className="nav-link">Calendar</Link></li>
            <li className="profile-menu">
              <button className="profile-button" onClick={handleDropdownClick}>
                Profile <FaChevronDown className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`} />
              </button>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-link">View Profile</Link>
                  <Link to="/edit-profile" className="dropdown-link">Edit Profile</Link>
                  <Link to="/login" className="dropdown-link">Logout</Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
