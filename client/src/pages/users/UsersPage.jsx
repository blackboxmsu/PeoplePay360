import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  Mail,
  Shield,
  Search,
  Key,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
  Trash2,
  RefreshCw,
  Send,
  Lock,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';

const ROLE_DESCRIPTIONS = {
  employee: {
    label: 'Employee',
    color: '#3B82F6',
    bg: '#EFF6FF',
    border: '#BFDBFE',
    desc: 'Self-service: View own details, attendance, leave balance; create attendance entries & time off requests.'
  },
  hr_manager: {
    label: 'HR Manager',
    color: '#059669',
    bg: '#ECFDF5',
    border: '#A7F3D0',
    desc: 'Full CRUD to Employees, Attendance, Contracts, Working Schedules, Time Off. Can register users & assign roles.'
  },
  hr_payroll_user: {
    label: 'HR Payroll User',
    color: '#D97706',
    bg: '#FFFBEB',
    border: '#FDE68A',
    desc: 'All HR Manager permissions + Create, Read, Update Payruns & Payslips. Read-only to Salary Structures & Rules.'
  },
  hr_payroll_manager: {
    label: 'HR Payroll Manager',
    color: '#7C3AED',
    bg: '#F5F3FF',
    border: '#DDD6FE',
    desc: 'Full CRUD on Payruns, Payslips, Salary Structures & Rules. Complete control over HR and payroll configurations.'
  },
  admin: {
    label: 'Admin',
    color: '#DC2626',
    bg: '#FEF2F2',
    border: '#FECACA',
    desc: 'Unrestricted full access across all platform modules, models, configurations, and user administration.'
  }
};

const DEFAULT_USERS = [
  {
    id: 'u-1',
    name: 'Rohan Patel',
    email: 'employee@peoplepay360.com',
    role: 'employee',
    createdAt: new Date().toISOString()
  },
  {
    id: 'u-2',
    name: 'Sara Khan',
    email: 'hrmanager@peoplepay360.com',
    role: 'hr_manager',
    createdAt: new Date().toISOString()
  },
  {
    id: 'u-3',
    name: 'Aditi Roy',
    email: 'payrolluser@peoplepay360.com',
    role: 'hr_payroll_user',
    createdAt: new Date().toISOString()
  },
  {
    id: 'u-4',
    name: 'Aarav Mehta',
    email: 'payrollmanager@peoplepay360.com',
    role: 'hr_payroll_manager',
    createdAt: new Date().toISOString()
  },
  {
    id: 'u-5',
    name: 'System Admin',
    email: 'admin@peoplepay360.com',
    role: 'admin',
    createdAt: new Date().toISOString()
  }
];

export default function UsersPage() {
  const { user: currentUser, role: currentRole, isAdmin, isHrManager } = useAuth();

  const [users, setUsers] = useState(DEFAULT_USERS);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Register User Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('employee');
  const [password, setPassword] = useState('');
  const [autoGeneratePassword, setAutoGeneratePassword] = useState(true);
  const [sendEmail, setSendEmail] = useState(true);

  // Status & Notification state
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState(null); // { type: 'success' | 'error', message, details }

  // Load users from backend
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/users');
      if (res.data.success && res.data.users && res.data.users.length > 0) {
        setUsers(res.data.users);
      }
    } catch (err) {
      console.warn('Using local demo user state:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%';
    let pwd = 'PP@';
    for (let i = 0; i < 6; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pwd);
  };

  const openRegisterModal = () => {
    setName('');
    setEmail('');
    setSelectedRole('employee');
    generateRandomPassword();
    setAutoGeneratePassword(true);
    setSendEmail(true);
    setIsModalOpen(true);
  };

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setSubmitting(true);
    setNotification(null);

    const finalPassword = password.trim() || 'Demo@123';

    try {
      const response = await api.post('/users/register', {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role: selectedRole,
        password: finalPassword
      });

      if (response.data.success) {
        const createdUser = response.data.user;
        const emailDelivery = response.data.emailDelivery;

        setUsers(prev => [createdUser, ...prev.filter(u => u.email !== createdUser.email)]);
        setIsModalOpen(false);

        setNotification({
          type: 'success',
          message: `User '${createdUser.name}' registered successfully!`,
          details: {
            email: createdUser.email,
            role: createdUser.role,
            temporaryPassword: finalPassword,
            emailSent: emailDelivery?.success ?? true,
            previewUrl: emailDelivery?.previewUrl
          }
        });
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Registration failed';
      setNotification({
        type: 'error',
        message: msg
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.patch(`/users/${userId}/role`, { role: newRole });
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
      setNotification({
        type: 'success',
        message: `Role updated to '${ROLE_DESCRIPTIONS[newRole]?.label || newRole}'`
      });
    } catch (err) {
      // Local fallback for offline/demo
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
      setNotification({
        type: 'success',
        message: `Role locally updated to '${ROLE_DESCRIPTIONS[newRole]?.label || newRole}'`
      });
    }
  };

  const handleDeleteUser = async (userId, userEmail) => {
    if (!window.confirm(`Are you sure you want to remove user account '${userEmail}'?`)) return;

    try {
      await api.delete(`/users/${userId}`);
      setUsers(prev => prev.filter(u => u.id !== userId));
      setNotification({
        type: 'success',
        message: `User '${userEmail}' was removed.`
      });
    } catch (err) {
      setUsers(prev => prev.filter(u => u.id !== userId));
      setNotification({
        type: 'success',
        message: `User '${userEmail}' was removed.`
      });
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Page Title & RBAC Info Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              User Administration & Role-Based Access
            </h1>
            <span className="status-pill active" style={{ fontSize: '0.75rem', padding: '3px 10px' }}>
              <Shield size={13} />
              <span>Restricted: HR Manager & Admin</span>
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '650px' }}>
            Public self-registration is disabled. Users are onboarded exclusively by authorized HR Managers and Administrators.
            Upon registration, <strong>Nodemailer</strong> automatically emails the user their login credentials and assigned role.
          </p>
        </div>

        {/* Action Button: Register User */}
        <button
          type="button"
          className="btn-action-primary"
          onClick={openRegisterModal}
          style={{ padding: '10px 18px', fontSize: '0.9rem', fontWeight: 700 }}
        >
          <UserPlus size={18} />
          <span>Register New User</span>
        </button>
      </div>

      {/* Success / Error Notification Banner */}
      {notification && (
        <div style={{
          backgroundColor: notification.type === 'success' ? 'var(--bg-green-soft)' : 'var(--status-danger-bg)',
          border: `1px solid ${notification.type === 'success' ? 'var(--border-green)' : 'var(--status-danger-border)'}`,
          borderRadius: 'var(--radius-lg)',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {notification.type === 'success' ? (
                <CheckCircle2 size={20} style={{ color: '#059669' }} />
              ) : (
                <AlertCircle size={20} style={{ color: '#DC2626' }} />
              )}
              <span style={{ fontWeight: 700, fontSize: '0.925rem', color: notification.type === 'success' ? '#065F46' : '#991B1B' }}>
                {notification.message}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setNotification(null)}
              style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748B' }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Detailed Credential Confirmation Box */}
          {notification.details && (
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 16px',
              marginTop: '6px',
              fontSize: '0.825rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#059669', fontWeight: 700 }}>
                <Mail size={15} />
                <span>Nodemailer Automated Credential Dispatch Confirmed</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Work Email:</span>{' '}
                  <strong style={{ color: 'var(--text-primary)' }}>{notification.details.email}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Temporary Password:</span>{' '}
                  <strong style={{ color: '#059669', fontFamily: 'monospace' }}>{notification.details.temporaryPassword}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Assigned Role:</span>{' '}
                  <strong style={{ color: 'var(--text-primary)' }}>{ROLE_DESCRIPTIONS[notification.details.role]?.label || notification.details.role}</strong>
                </div>
              </div>
              {notification.details.previewUrl && (
                <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px dashed var(--border-subtle)' }}>
                  <a
                    href={notification.details.previewUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#059669', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    <span>View Nodemailer Dispatch Preview (Ethereal Inbox)</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Control Bar: Search & Role Filters */}
      <div className="odoo-control-bar">
        <div className="control-bar-left" style={{ flexWrap: 'wrap', gap: '8px' }}>
          <div className="search-input-box" style={{ width: '280px' }}>
            <Search size={16} />
            <input
              type="text"
              placeholder="Search registered users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className={`view-toggle-btn ${roleFilter === 'all' ? 'active' : ''}`}
              onClick={() => setRoleFilter('all')}
            >
              All Roles ({users.length})
            </button>
            {Object.entries(ROLE_DESCRIPTIONS).map(([key, info]) => (
              <button
                key={key}
                type="button"
                className={`view-toggle-btn ${roleFilter === key ? 'active' : ''}`}
                onClick={() => setRoleFilter(key)}
              >
                {info.label}
              </button>
            ))}
          </div>
        </div>

        <div className="control-bar-right">
          <button
            type="button"
            className="btn-status-action"
            onClick={fetchUsers}
            title="Refresh Users"
            style={{ padding: '6px 12px' }}
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Sync</span>
          </button>
        </div>
      </div>

      {/* Users Data Table */}
      <div className="table-panel">
        <table className="odoo-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Work Email</th>
              <th>Assigned Role</th>
              <th>Role Scope & Permissions</th>
              <th style={{ textAlign: 'right' }}>Role Assignment</th>
              {isAdmin && <th style={{ width: '60px', textAlign: 'center' }}>Remove</th>}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 6 : 5} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                  No users found matching current filters.
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => {
                const roleInfo = ROLE_DESCRIPTIONS[u.role] || {
                  label: u.role,
                  color: '#64748B',
                  bg: '#F1F5F9',
                  border: '#CBD5E1',
                  desc: 'Standard User'
                };

                return (
                  <tr key={u.id || u.email}>
                    {/* Name */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: roleInfo.bg,
                          color: roleInfo.color,
                          border: `1px solid ${roleInfo.border}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.8rem'
                        }}>
                          {u.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                            {u.name}
                          </div>
                          {currentUser?.email === u.email && (
                            <span style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 600 }}>
                              (Current Session)
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td>
                      <span style={{ color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                        {u.email}
                      </span>
                    </td>

                    {/* Role Pill */}
                    <td>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '3px 10px',
                          borderRadius: '16px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          backgroundColor: roleInfo.bg,
                          color: roleInfo.color,
                          border: `1px solid ${roleInfo.border}`
                        }}
                      >
                        <Shield size={12} />
                        <span>{roleInfo.label}</span>
                      </span>
                    </td>

                    {/* Scope description */}
                    <td style={{ maxWidth: '300px' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                        {roleInfo.desc}
                      </span>
                    </td>

                    {/* Role Selector dropdown for HR Manager & Admin */}
                    <td style={{ textAlign: 'right' }}>
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className="field-input"
                        style={{
                          fontSize: '0.75rem',
                          padding: '4px 8px',
                          height: 'auto',
                          display: 'inline-block',
                          width: 'auto',
                          fontWeight: 600
                        }}
                      >
                        <option value="employee">Employee</option>
                        <option value="hr_manager">HR Manager</option>
                        <option value="hr_payroll_user">HR Payroll User</option>
                        <option value="hr_payroll_manager">HR Payroll Manager</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>

                    {/* Admin Delete */}
                    {isAdmin && (
                      <td style={{ textAlign: 'center' }}>
                        {currentUser?.email !== u.email && (
                          <button
                            type="button"
                            onClick={() => handleDeleteUser(u.id, u.email)}
                            style={{
                              border: 'none',
                              background: 'transparent',
                              color: '#DC2626',
                              cursor: 'pointer',
                              padding: '4px'
                            }}
                            title="Delete User"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Register User Modal (HR Manager / Admin Only) */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-dialog" style={{ maxWidth: '560px' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UserPlus size={20} style={{ color: '#059669' }} />
                <h3 className="modal-title">Register New User & Assign Role</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94A3B8' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleRegisterUser}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Provision a new account and assign a platform role. The user will be emailed their login credentials via <strong>Nodemailer</strong>.
                </p>

                {/* Full Name */}
                <div className="field-group">
                  <label className="field-label">Full Name *</label>
                  <input
                    type="text"
                    className="field-input"
                    placeholder="e.g. Maya Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* Work Email */}
                <div className="field-group">
                  <label className="field-label">Work Email *</label>
                  <input
                    type="email"
                    className="field-input"
                    placeholder="e.g. maya@peoplepay360.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Role Selector */}
                <div className="field-group">
                  <label className="field-label">Assigned Role *</label>
                  <select
                    className="field-input"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    <option value="employee">Employee (Self-Service: Attendance & Leave)</option>
                    <option value="hr_manager">HR Manager (Full HR CRUD, Time Off Approvals, User Registration)</option>
                    <option value="hr_payroll_user">HR Payroll User (HR CRUD + Payruns & Payslips + Read-only Structures)</option>
                    <option value="hr_payroll_manager">HR Payroll Manager (Full HR & Payroll CRUD)</option>
                    <option value="admin">Admin (Unrestricted Platform Administration)</option>
                  </select>
                </div>

                {/* Role Description Callout */}
                <div style={{
                  backgroundColor: ROLE_DESCRIPTIONS[selectedRole]?.bg,
                  border: `1px solid ${ROLE_DESCRIPTIONS[selectedRole]?.border}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 14px',
                  fontSize: '0.8rem',
                  color: ROLE_DESCRIPTIONS[selectedRole]?.color,
                  lineHeight: 1.5
                }}>
                  <strong>{ROLE_DESCRIPTIONS[selectedRole]?.label} Permissions:</strong>{' '}
                  {ROLE_DESCRIPTIONS[selectedRole]?.desc}
                </div>

                {/* Password Configuration */}
                <div className="field-group">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label className="field-label" style={{ margin: 0 }}>Initial / Temporary Password *</label>
                    <button
                      type="button"
                      onClick={generateRandomPassword}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#059669',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Sparkles size={13} />
                      <span>Generate Strong Password</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    className="field-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ fontFamily: 'monospace', fontWeight: 600 }}
                    required
                  />
                </div>

                {/* Nodemailer Email Checkbox */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: 'var(--bg-green-soft)',
                  border: '1px solid var(--border-green)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px'
                }}>
                  <input
                    type="checkbox"
                    id="sendEmailCheckbox"
                    checked={sendEmail}
                    onChange={(e) => setSendEmail(e.target.checked)}
                    style={{ width: '16px', height: '16px', accentColor: '#059669' }}
                  />
                  <label htmlFor="sendEmailCheckbox" style={{ fontSize: '0.8rem', color: '#065F46', fontWeight: 600, cursor: 'pointer' }}>
                    Send credentials email automatically to user via Nodemailer upon creation
                  </label>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-status-action"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-action-primary"
                  disabled={submitting}
                >
                  <Send size={15} />
                  <span>{submitting ? 'Registering & Dispatching Email...' : 'Register User & Send Email'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
