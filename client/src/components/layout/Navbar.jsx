import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Shield, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import store from '../../services/dataStore';
import QuickAttendanceWidget from '../common/QuickAttendanceWidget';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, role, logout, canAccessPayroll, canManageHR, canManageUsers, isEmployeeSelf } = useAuth();

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
  const userKey = user?.email || 'default_user';

  const [isCheckedIn, setIsCheckedIn] = useState(() => {
    try {
      const saved = localStorage.getItem(`peoplepay360_att_session_${user?.email || 'default'}`);
      if (saved) return JSON.parse(saved).isCheckedIn;
    } catch (e) {}
    return true; // Default checked-in for demo
  });

  const [checkInTime, setCheckInTime] = useState('09:05 AM');
  const [elapsedTime, setElapsedTime] = useState('6h56');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const displayName = user?.name || 'Aarav Mehta';
  const roleLabels = {
    employee: 'Employee',
    hr_manager: 'HR Manager',
    hr_payroll_user: 'HR Payroll User',
    hr_payroll_manager: 'HR Payroll Manager',
    admin: 'Admin'
  };
  const roleDisplay = roleLabels[role] || role;

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
      setUserDropdownOpen(false);
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleDropdown = (e, name) => {
    e.stopPropagation();
    setUserDropdownOpen(false);
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const toggleUserDropdown = (e) => {
    e.stopPropagation();
    setActiveDropdown(null);
    setUserDropdownOpen(!userDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleToggleCheckIn = () => {
    const todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
    const nowTimeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const empRecord = store.getEmployees().find(e => (user?.employeeId && e.id === user.employeeId) || (e.name && e.name.toLowerCase() === displayName.toLowerCase()));

    if (isCheckedIn) {
      // User is checking out: complete session and record in store
      const newRec = {
        id: `att-${Date.now()}`,
        employeeId: empRecord?.id || user?.employeeId || 'emp-5',
        employeeName: empRecord?.name || displayName,
        date: todayStr,
        checkIn: checkInTime || '09:00',
        checkOut: nowTimeStr,
        workedHours: '8.50',
        status: 'Present',
        department: empRecord?.department || (role === 'hr_manager' ? 'HR' : role === 'employee' ? 'Engineering' : 'Finance'),
        manager: empRecord?.manager || 'Sara Khan',
        overtime: '0.50 hrs',
        notes: 'System-generated from check in/out via top navigation bar.'
      };

      store.saveAttendance(newRec);
      setIsCheckedIn(false);
      try {
        localStorage.setItem(`peoplepay360_att_session_${userKey}`, JSON.stringify({ isCheckedIn: false }));
      } catch (e) {}
    } else {
      // User is checking in
      setCheckInTime(nowTimeStr);
      setElapsedTime('0h01');
      setIsCheckedIn(true);
      try {
        localStorage.setItem(`peoplepay360_att_session_${userKey}`, JSON.stringify({ isCheckedIn: true, checkInTime: nowTimeStr }));
      } catch (e) {}
    }
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
          {/* Dashboard (Visible to all) */}
          <div className="nav-menu-item">
            <NavLink
              to="/"
              className={({ isActive }) => `nav-link-btn ${isActive ? 'active' : ''}`}
              end
            >
              Dashboard
            </NavLink>
          </div>

          {/* Employees ▼ (Visible to HR and Payroll, hidden for Employee self-service) */}
          {canManageHR && (
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
                  <NavLink
                    to="/schedules"
                    className="dropdown-item"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Working Schedules
                  </NavLink>
                </div>
              )}
            </div>
          )}

          {/* Employee Self-Service Menus (Visible to employee only) */}
          {isEmployeeSelf && (
            <>
              <div className="nav-menu-item">
                <NavLink
                  to="/employees"
                  className={({ isActive }) => `nav-link-btn ${isActive ? 'active' : ''}`}
                >
                  <span>My Profile</span>
                </NavLink>
              </div>
              <div className="nav-menu-item">
                <NavLink
                  to="/payroll/payslips"
                  className={({ isActive }) => `nav-link-btn ${isActive ? 'active' : ''}`}
                >
                  <span>My Payslips</span>
                </NavLink>
              </div>
            </>
          )}

          {/* Contracts ▼ (Hidden for Employee role) */}
          {canManageHR && (
            <>
              <div className="nav-menu-item">
                <NavLink
                  to="/contracts"
                  className={({ isActive }) => `nav-link-btn ${isActive ? 'active' : ''}`}
                >
                  <span>Contracts</span>
                </NavLink>
              </div>

              <div className="nav-menu-item">
                <NavLink
                  to="/schedules"
                  className={({ isActive }) => `nav-link-btn ${isActive ? 'active' : ''}`}
                >
                  <span>Schedules</span>
                </NavLink>
              </div>
            </>
          )}

          {/* Attendance (Visible to all) */}
          <div className="nav-menu-item">
            <NavLink
              to="/attendance"
              className={({ isActive }) => `nav-link-btn ${isActive ? 'active' : ''}`}
            >
              <span>Attendance</span>
            </NavLink>
          </div>

          {/* Time Off ▼ (Filtered by role) */}
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
                  {isEmployeeSelf ? 'My Leave Requests' : 'Time Off Requests'}
                </NavLink>

                <NavLink
                  to="/timeoff/allocations"
                  className="dropdown-item"
                  onClick={() => setActiveDropdown(null)}
                >
                  {isEmployeeSelf ? 'My Leave Balances' : 'Allocations'}
                </NavLink>

                {!isEmployeeSelf && (
                  <NavLink
                    to="/timeoff/types"
                    className="dropdown-item"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Time Off Types
                  </NavLink>
                )}
              </div>
            )}
          </div>

          {/* Payroll ▼ (Strictly hidden for Employee and HR Manager, only for Payroll roles & Admin) */}
          {canAccessPayroll && (
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
          )}

          {/* Users & Role Management (Restricted to HR Manager and Admin) */}
          {canManageUsers && (
            <div className="nav-menu-item">
              <NavLink
                to="/users"
                className={({ isActive }) => `nav-link-btn ${isActive ? 'active' : ''}`}
              >
                <span>Users</span>
              </NavLink>
            </div>
          )}
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
          <span>{roleDisplay}</span>
        </div>

        {/* User profile dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            className="user-profile-btn"
            onClick={toggleUserDropdown}
            title={`${displayName} (${roleDisplay})`}
          >
            <div className="user-avatar-small">
              {displayName.substring(0, 2).toUpperCase()}
            </div>
            <span className="user-name-small">{displayName}</span>
            <ChevronDown size={12} style={{ color: '#64748B' }} />
          </button>

          {userDropdownOpen && (
            <div
              className="nav-dropdown"
              style={{ right: 0, left: 'auto', minWidth: '170px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ padding: '6px 12px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '4px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {displayName}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 600 }}>
                  {roleDisplay}
                </div>
              </div>

              <button
                type="button"
                className="dropdown-item"
                onClick={handleLogout}
                style={{ width: '100%', border: 'none', background: 'transparent', cursor: 'pointer', color: '#DC2626' }}
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating Quick Attendance Widget */}
      <QuickAttendanceWidget
        isOpen={isAttendanceOpen}
        onClose={() => setIsAttendanceOpen(false)}
        userName={displayName}
        isCheckedIn={isCheckedIn}
        onToggleCheckIn={handleToggleCheckIn}
        checkInTime={checkInTime}
        elapsedTime={elapsedTime}
      />
    </header>
  );
}
