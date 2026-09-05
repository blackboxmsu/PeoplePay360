import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppShell from './components/layout/AppShell';
import ProtectedRoute from './components/common/ProtectedRoute';

// Auth Page
import LoginPage from './pages/LoginPage';

// Core Pages
import DashboardPage from './pages/DashboardPage';
import EmployeesPage from './pages/EmployeesPage';
import ContractsPage from './pages/ContractsPage';
import WorkingSchedulesPage from './pages/WorkingSchedulesPage';
import AttendancePage from './pages/AttendancePage';
import UsersPage from './pages/UsersPage';

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
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Authentication Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Application Routes */}
          <Route
            element={
              <ProtectedRoute>
                <AppShell />
              </ProtectedRoute>
            }
          >
            {/* Dashboard (All authenticated roles) */}
            <Route path="/" element={<DashboardPage />} />

            {/* Employees & Profile (Employee Self-Service + HR/Payroll/Admin Directory) */}
            <Route
              path="/employees"
              element={
                <ProtectedRoute allowedRoles={['employee', 'hr_manager', 'hr_payroll_user', 'hr_payroll_manager', 'admin']}>
                  <EmployeesPage />
                </ProtectedRoute>
              }
            />

            {/* Contracts (HR & Payroll & Admin) */}
            <Route
              path="/contracts"
              element={
                <ProtectedRoute allowedRoles={['hr_manager', 'hr_payroll_user', 'hr_payroll_manager', 'admin']}>
                  <ContractsPage />
                </ProtectedRoute>
              }
            />

            {/* Working Schedules (HR & Payroll & Admin) */}
            <Route
              path="/schedules"
              element={
                <ProtectedRoute allowedRoles={['hr_manager', 'hr_payroll_user', 'hr_payroll_manager', 'admin']}>
                  <WorkingSchedulesPage />
                </ProtectedRoute>
              }
            />

            {/* Attendance (All authenticated roles) */}
            <Route path="/attendance" element={<AttendancePage />} />

            {/* Time Off Sub-routes */}
            <Route path="/timeoff">
              <Route index element={<Navigate to="/timeoff/requests" replace />} />
              <Route path="requests" element={<TimeOffRequestsPage />} />
              <Route
                path="allocations"
                element={
                  <ProtectedRoute allowedRoles={['hr_manager', 'hr_payroll_user', 'hr_payroll_manager', 'admin']}>
                    <TimeOffAllocationsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="types"
                element={
                  <ProtectedRoute allowedRoles={['hr_manager', 'hr_payroll_user', 'hr_payroll_manager', 'admin']}>
                    <TimeOffTypesPage />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Payroll Sub-routes (Payroll roles & Admin only) */}
            <Route
              path="/payroll"
              element={
                <ProtectedRoute allowedRoles={['hr_payroll_user', 'hr_payroll_manager', 'admin']}>
                  <Navigate to="/payroll/payruns" replace />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payroll/payruns"
              element={
                <ProtectedRoute allowedRoles={['hr_payroll_user', 'hr_payroll_manager', 'admin']}>
                  <PayrunsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payroll/payslips"
              element={
                <ProtectedRoute allowedRoles={['hr_payroll_user', 'hr_payroll_manager', 'admin']}>
                  <PayslipsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payroll/structures"
              element={
                <ProtectedRoute allowedRoles={['hr_payroll_user', 'hr_payroll_manager', 'admin']}>
                  <SalaryStructuresPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payroll/rules"
              element={
                <ProtectedRoute allowedRoles={['hr_payroll_user', 'hr_payroll_manager', 'admin']}>
                  <SalaryRulesPage />
                </ProtectedRoute>
              }
            />

            {/* Users & Role Management (HR Manager & Admin only) */}
            <Route
              path="/users"
              element={
                <ProtectedRoute allowedRoles={['hr_manager', 'admin']}>
                  <UsersPage />
                </ProtectedRoute>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
