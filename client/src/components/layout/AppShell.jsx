import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function AppShell() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-app)' }}>
      <Navbar userRole="HR Payroll Manager" userName="Aarav Mehta" />
      <main className="main-wrapper">
        <Outlet />
      </main>
    </div>
  );
}
