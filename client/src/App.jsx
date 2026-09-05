import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';

// Pages
import DashboardPage from './pages/DashboardPage';
import EmployeesPage from './pages/EmployeesPage';
import ContractsPage from './pages/ContractsPage';
import AttendancePage from './pages/AttendancePage';

// Time Off Sub-pages
import TimeOffRequestsPage from './pages/timeoff/TimeOffRequestsPage';
import TimeOffAllocationsPage from './pages/timeoff/TimeOffAllocationsPage';
import TimeOffTypesPage from './pages/timeoff/TimeOffTypesPage';

// Payroll Sub-pages
import PayrunsPage from './pages/payroll/PayrunsPage';
import PayslipsPage from './pages/payroll/PayslipsPage';
import SalaryStructuresPage from './pages/payroll/SalaryStructuresPage';
import SalaryRulesPage from './pages/payroll/SalaryRulesPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/contracts" element={<ContractsPage />} />
          <Route path="/attendance" element={<AttendancePage />} />

          {/* Time Off Sub-routes */}
          <Route path="/timeoff">
            <Route index element={<Navigate to="/timeoff/requests" replace />} />
            <Route path="requests" element={<TimeOffRequestsPage />} />
            <Route path="allocations" element={<TimeOffAllocationsPage />} />
            <Route path="types" element={<TimeOffTypesPage />} />
          </Route>

          {/* Payroll Sub-routes */}
          <Route path="/payroll">
            <Route index element={<Navigate to="/payroll/payruns" replace />} />
            <Route path="payruns" element={<PayrunsPage />} />
            <Route path="payslips" element={<PayslipsPage />} />
            <Route path="structures" element={<SalaryStructuresPage />} />
            <Route path="rules" element={<SalaryRulesPage />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
