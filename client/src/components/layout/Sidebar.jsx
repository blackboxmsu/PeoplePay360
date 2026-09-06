import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileSignature,
  Clock,
  CalendarDays,
  Banknote,
  ChevronDown,
  ChevronRight,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ userRole = 'HR Payroll Manager', userName = 'Admin User' }) {
  const location = useLocation();
  const { canManageUsers } = useAuth();

  // Manage open/close states for collapsible submenus
  const [timeOffOpen, setTimeOffOpen] = useState(
    location.pathname.startsWith('/timeoff') || true
  );
  const [payrollOpen, setPayrollOpen] = useState(
    location.pathname.startsWith('/payroll') || true
  );

  return (
    <aside className="app-sidebar">
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="brand-badge">P</div>
        <div className="brand-info">
          <span className="brand-title">PeoplePay360</span>
          <span className="brand-sub">HR & Payroll Suite</span>
        </div>
      </div>

      {/* Nav List */}
      <div className="sidebar-content">
        <div className="sidebar-section-title">Overview</div>

        <NavLink
          to="/"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          end
        >
          <span className="nav-item-icon"><LayoutDashboard size={18} /></span>
          <span className="nav-item-text">Dashboard</span>
        </NavLink>

        <div className="sidebar-section-title">Workforce & Operations</div>

        {/* Employees */}
        <NavLink
          to="/employees"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <span className="nav-item-icon"><Users size={18} /></span>
          <span className="nav-item-text">Employees</span>
        </NavLink>

        {/* Contracts */}
        <NavLink
          to="/contracts"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <span className="nav-item-icon"><FileSignature size={18} /></span>
          <span className="nav-item-text">Contracts</span>
        </NavLink>

        {/* Working Schedules */}
        <NavLink
          to="/schedules"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <span className="nav-item-icon"><Clock size={18} /></span>
          <span className="nav-item-text">Working Schedules</span>
        </NavLink>

        {/* Attendance */}
        <NavLink
          to="/attendance"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <span className="nav-item-icon"><Clock size={18} /></span>
          <span className="nav-item-text">Attendance</span>
        </NavLink>

        {/* Time Off (Collapsible) */}
        <div>
          <button
            type="button"
            className={`nav-item ${location.pathname.startsWith('/timeoff') ? 'active' : ''}`}
            onClick={() => setTimeOffOpen(!timeOffOpen)}
          >
            <span className="nav-item-icon"><CalendarDays size={18} /></span>
            <span className="nav-item-text">Time Off</span>
            {timeOffOpen ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
          </button>

          {timeOffOpen && (
            <div className="sub-menu">
              <NavLink
                to="/timeoff/requests"
                className={({ isActive }) => `sub-nav-item ${isActive ? 'active' : ''}`}
              >
                Requests
              </NavLink>
              <NavLink
                to="/timeoff/allocations"
                className={({ isActive }) => `sub-nav-item ${isActive ? 'active' : ''}`}
              >
                Allocations
              </NavLink>
              <NavLink
                to="/timeoff/types"
                className={({ isActive }) => `sub-nav-item ${isActive ? 'active' : ''}`}
              >
                Time Off Types
              </NavLink>
            </div>
          )}
        </div>

        <div className="sidebar-section-title">Compensation & Payroll</div>

        {/* Payroll (Collapsible) */}
        <div>
          <button
            type="button"
            className={`nav-item ${location.pathname.startsWith('/payroll') ? 'active' : ''}`}
            onClick={() => setPayrollOpen(!payrollOpen)}
          >
            <span className="nav-item-icon"><Banknote size={18} /></span>
            <span className="nav-item-text">Payroll</span>
            {payrollOpen ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
          </button>

          {payrollOpen && (
            <div className="sub-menu">
              <NavLink
                to="/payroll/payruns"
                className={({ isActive }) => `sub-nav-item ${isActive ? 'active' : ''}`}
              >
                Payruns
              </NavLink>
              <NavLink
                to="/payroll/payslips"
                className={({ isActive }) => `sub-nav-item ${isActive ? 'active' : ''}`}
              >
                Payslips
              </NavLink>
              <NavLink
                to="/payroll/structures"
                className={({ isActive }) => `sub-nav-item ${isActive ? 'active' : ''}`}
              >
                Salary Structures
              </NavLink>
              <NavLink
                to="/payroll/rules"
                className={({ isActive }) => `sub-nav-item ${isActive ? 'active' : ''}`}
              >
                Salary Rules
              </NavLink>
            </div>
          )}
        </div>

        {canManageUsers && (
          <>
            <div className="sidebar-section-title">Administration</div>
            <NavLink
              to="/users"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-item-icon"><ShieldCheck size={18} /></span>
              <span className="nav-item-text">User Management</span>
            </NavLink>
          </>
        )}
      </div>

      {/* Sidebar Footer with current user preview */}
      <div className="sidebar-footer">
        <div className="user-snippet">
          <div className="user-avatar">
            {userName.substring(0, 2).toUpperCase()}
          </div>
          <div className="user-info">
            <div className="user-name">{userName}</div>
            <span className="user-role-badge">{userRole}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
