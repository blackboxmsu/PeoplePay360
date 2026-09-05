import React from 'react';
import { LogOut, Bell, Shield } from 'lucide-react';

export default function Topbar({
  role = 'HR Payroll Manager',
  userName = 'Demo User',
  onLogout
}) {
  return (
    <header className="app-topbar">
      <div className="topbar-left">
        <div className="system-status-pill">
          <span className="status-dot"></span>
          <span>System Online • MERN Monorepo</span>
        </div>
      </div>

      <div className="topbar-right">
        <div className="system-status-pill" style={{ background: '#F0FDF4', color: '#166534', border: '1px solid #BBF7D0' }}>
          <Shield size={14} />
          <span>Role: <strong>{role}</strong></span>
        </div>

        <button
          type="button"
          className="btn-secondary-light"
          title="Notifications"
        >
          <Bell size={15} />
        </button>

        <button
          type="button"
          className="btn-secondary-light"
          onClick={onLogout || (() => {})}
          title="Logout"
        >
          <LogOut size={15} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
