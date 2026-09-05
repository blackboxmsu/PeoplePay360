import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Clock, Shield, LogOut } from 'lucide-react';
import QuickAttendanceWidget from '../common/QuickAttendanceWidget';

export default function Navbar({
  userRole = 'HR Payroll Manager',
  userName = 'Aarav Mehta'
}) {
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(true);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleDropdown = (e, name) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header className="odoo-navbar">
      <div className="navbar-left">
        {/* Brand Pill */}
        <NavLink to="/" className="nav-brand-pill">
          <span>HR</span>
        </NavLink>

        {/* Top Menus */}
        <nav className="navbar-menu">
          {/* Dashboard */}
          <div className="nav-menu-item">
            <NavLink
              to="/"
              className={({ isActive }) => `nav-link-btn ${isActive ? 'active' : ''}`}
              end
            >
              Dashboard
            </NavLink>
          </div>

          {/* Employees ▼ */}
          <div className="nav-menu-item">
            <button
              type="button"
              className={`nav-link-btn ${location.pathname.startsWith('/employees') ? 'active' : ''}`}
              onClick={(e) => toggleDropdown(e, 'employees')}
            >
              <span>Employees</span>
              <ChevronDown size={14} />
            </button>

            {activeDropdown === 'employees' && (
              <div className="nav-dropdown" onClick={(e) => e.stopPropagation()}>
                <NavLink
                  to="/employees?view=kanban"
                  className="dropdown-item"
                  onClick={() => setActiveDropdown(null)}
                >
                  Kanban View
                </NavLink>
                <NavLink
                  to="/employees?view=list"
                  className="dropdown-item"
                  onClick={() => setActiveDropdown(null)}
                >
                  List View
                </NavLink>
              </div>
            )}
          </div>

          {/* Contracts ▼ */}
          <div className="nav-menu-item">
            <NavLink
              to="/contracts"
              className={({ isActive }) => `nav-link-btn ${isActive ? 'active' : ''}`}
            >
              <span>Contracts</span>
            </NavLink>
          </div>

          {/* Attendance */}
          <div className="nav-menu-item">
            <NavLink
              to="/attendance"
              className={({ isActive }) => `nav-link-btn ${isActive ? 'active' : ''}`}
            >
              <span>Attendance</span>
            </NavLink>
          </div>

          {/* Time Off ▼ */}
          <div className="nav-menu-item">
            <button
              type="button"
              className={`nav-link-btn ${location.pathname.startsWith('/timeoff') ? 'active' : ''}`}
              onClick={(e) => toggleDropdown(e, 'timeoff')}
            >
              <span>Time Off</span>
              <ChevronDown size={14} />
            </button>

            {activeDropdown === 'timeoff' && (
              <div className="nav-dropdown" onClick={(e) => e.stopPropagation()}>
                <NavLink
                  to="/timeoff/requests"
                  className="dropdown-item"
                  onClick={() => setActiveDropdown(null)}
                >
                  Time Off Requests
                </NavLink>
                <NavLink
                  to="/timeoff/allocations"
                  className="dropdown-item"
                  onClick={() => setActiveDropdown(null)}
                >
                  Allocations
                </NavLink>
                <NavLink
                  to="/timeoff/types"
                  className="dropdown-item"
                  onClick={() => setActiveDropdown(null)}
                >
                  Time Off Types
                </NavLink>
              </div>
            )}
          </div>

          {/* Payroll ▼ */}
          <div className="nav-menu-item">
            <button
              type="button"
              className={`nav-link-btn ${location.pathname.startsWith('/payroll') ? 'active' : ''}`}
              onClick={(e) => toggleDropdown(e, 'payroll')}
            >
              <span>Payroll</span>
              <ChevronDown size={14} />
            </button>

            {activeDropdown === 'payroll' && (
              <div className="nav-dropdown" onClick={(e) => e.stopPropagation()}>
                <NavLink
                  to="/payroll/payruns"
                  className="dropdown-item"
                  onClick={() => setActiveDropdown(null)}
                >
                  Payruns
                </NavLink>
                <NavLink
                  to="/payroll/payslips"
                  className="dropdown-item"
                  onClick={() => setActiveDropdown(null)}
                >
                  Payslips
                </NavLink>
                <NavLink
                  to="/payroll/structures"
                  className="dropdown-item"
                  onClick={() => setActiveDropdown(null)}
                >
                  Salary Structures
                </NavLink>
                <NavLink
                  to="/payroll/rules"
                  className="dropdown-item"
                  onClick={() => setActiveDropdown(null)}
                >
                  Salary Rules
                </NavLink>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Navbar Right Controls */}
      <div className="navbar-right">
        {/* Quick Attendance Widget Trigger */}
        <button
          type="button"
          className={`attendance-indicator-btn ${isCheckedIn ? 'checked-in' : 'checked-out'}`}
          onClick={(e) => {
            e.stopPropagation();
            setIsAttendanceOpen(!isAttendanceOpen);
          }}
          title="Quick Attendance Tracker"
        >
          <span className="attendance-pulse-dot" />
          <span>{isCheckedIn ? 'Checked In' : 'Checked Out'}</span>
        </button>

        {/* Role Pill */}
        <div className="status-pill active" style={{ fontSize: '0.75rem' }}>
          <Shield size={12} />
          <span>{userRole}</span>
        </div>

        {/* User profile avatar */}
        <div className="user-profile-btn" title={userName}>
          <div className="user-avatar-small">
            {userName.substring(0, 2).toUpperCase()}
          </div>
          <span className="user-name-small">{userName}</span>
        </div>
      </div>

      {/* Floating Quick Attendance Widget */}
      <QuickAttendanceWidget
        isOpen={isAttendanceOpen}
        onClose={() => setIsAttendanceOpen(false)}
        userName={userName}
        isCheckedIn={isCheckedIn}
        onToggleCheckIn={() => setIsCheckedIn(!isCheckedIn)}
      />
    </header>
  );
}
