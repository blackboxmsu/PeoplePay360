import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Search,
  Plus,
  LayoutGrid,
  List,
  Edit2,
  CalendarDays,
  FileSignature,
  Clock,
  ArrowLeft,
  Mail,
  Phone,
  Building,
  Briefcase,
  UserCheck,
  Shield,
  Info,
  Save,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import store from '../../services/dataStore';

export default function EmployeesPage() {
  const { user, isEmployee, canManageHR, role } = useAuth();
  const canCreateEmployee = ['hr_manager', 'admin'].includes(role);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const viewMode = searchParams.get('view') || 'kanban';

  const [employees, setEmployees] = useState(store.getEmployees());
  const [workingSchedules, setWorkingSchedules] = useState(store.getWorkingSchedules());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [activeTab, setActiveTab] = useState('work'); // 'work' | 'private'

  // Edit / Create Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    jobPosition: '',
    department: 'Engineering',
    manager: 'Meet Rathod',
    workingScheduleId: 'ws-1',
    company: 'OxP Pvt Ltd',
    workLocation: 'Mumbai',
    employmentType: 'Full-time',
    status: 'Active',
    workEmail: '',
    phone: '',
    bankAccount: ''
  });

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setEmployees([...store.getEmployees()]);
      setWorkingSchedules([...store.getWorkingSchedules()]);
    });
    return unsub;
  }, []);

  // Update counts from live data for selected employee
  const getEmpCounts = (empName) => {
    const contracts = store.getContracts().filter(
      (c) => c.employeeName.toLowerCase() === empName.toLowerCase()
    );
    const attendance = store.getAttendance().filter(
      (a) => a.employeeName.toLowerCase() === empName.toLowerCase()
    );
    const timeOff = store.getTimeOffRequests().filter(
      (r) => r.employeeName.toLowerCase() === empName.toLowerCase()
    );
    return {
      contractsCount: contracts.length,
      attendanceCount: attendance.length,
      timeOffCount: timeOff.length
    };
  };

  const handleOpenCreateModal = () => {
    setModalMode('create');
    setFormData({
      id: `emp-${Date.now()}`,
      name: '',
      jobPosition: '',
      department: 'Engineering',
      manager: 'Meet Rathod',
      workingScheduleId: workingSchedules[0]?.id || 'ws-1',
      company: 'OxP Pvt Ltd',
      workLocation: 'Mumbai',
      employmentType: 'Full-time',
      status: 'Active',
      workEmail: '',
      phone: '+91 ',
      bankAccount: 'HDFC0001234 - '
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (emp) => {
    setModalMode('edit');
    setFormData({
      id: emp.id,
      name: emp.name,
      jobPosition: emp.jobPosition,
      department: emp.department,
      manager: emp.manager,
      workingScheduleId: emp.workingScheduleId || workingSchedules[0]?.id || 'ws-1',
      company: emp.company || 'OxP Pvt Ltd',
      workLocation: emp.workLocation || 'Mumbai',
      employmentType: emp.employmentType || 'Full-time',
      status: emp.status || 'Active',
      workEmail: emp.workEmail || '',
      phone: emp.phone || '',
      bankAccount: emp.bankAccount || ''
    });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!canCreateEmployee) return;
    if (!formData.name.trim()) return;

    store.saveEmployee(formData);
    setIsModalOpen(false);

    // Refresh selected employee if editing current
    if (selectedEmployee && selectedEmployee.id === formData.id) {
      const updated = store.getEmployees().find((e) => e.id === formData.id);
      if (updated) setSelectedEmployee(updated);
    }
  };

  // Self-service employee record: match logged in employee from master store
  const matchedEmp = employees.find(
    (e) =>
      (user?.email && e.workEmail?.toLowerCase() === user.email.toLowerCase()) ||
      (user?.name && e.name?.toLowerCase() === user.name.toLowerCase())
  );

  const ownEmployeeRecord = matchedEmp || {
    id: 'emp-self',
    initials: user?.name ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() : 'PS',
    name: user?.name || 'Parth Solanki',
    jobPosition: 'Senior Frontend Engineer',
    department: 'Engineering',
    manager: 'Raviraj Dhokiya',
    workingSchedule: 'Tech Flexible 35 Hours',
    company: 'OxP Pvt Ltd',
    workLocation: 'Mumbai Tech Hub',
    employmentType: 'Full-time',
    status: 'Active',
    workEmail: user?.email || 'employee@peoplepay360.com',
    phone: '+91 98765 00005',
    contractsCount: 1,
    attendanceCount: 20,
    timeOffCount: 2,
    allocatedLeaves: 20,
    leaveBalance: 16
  };

  // If logged in as Employee, show personal profile only (read-only self-service)
  if (isEmployee) {
    const emp = ownEmployeeRecord;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Top Header with RBAC notice */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                My Employee Profile
              </h1>
              <span className="status-pill active" style={{ fontSize: '0.75rem' }}>
                <Shield size={12} />
                <span>Self-Service View</span>
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              View your personal employee details, contract working schedule, and leave balances.
            </p>
          </div>

          {/* Quick Leave Balance Widget */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '10px 18px'
            }}
          >
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Leave Balance
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#059669' }}>
                {emp.leaveBalance} Days
              </div>
            </div>
            <div style={{ borderLeft: '1px solid var(--border-subtle)', height: '28px' }} />
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Annual Quota
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {emp.allocatedLeaves} Days
              </div>
            </div>
          </div>
        </div>

        {/* Smart Buttons with filtered links */}
        <div className="smart-buttons-bar" style={{ margin: 0 }}>
          <button
            type="button"
            className="smart-button"
            onClick={() => navigate(`/timeoff/requests?employee=${encodeURIComponent(emp.name)}`)}
            title="Open My Time Off"
          >
            <CalendarDays size={16} style={{ color: '#059669' }} />
            <span>My Time Off</span>
            <span className="smart-button-count">{emp.timeOffCount}</span>
          </button>

          <button
            type="button"
            className="smart-button"
            onClick={() => navigate(`/attendance?employee=${encodeURIComponent(emp.name)}`)}
            title="Open My Attendance"
          >
            <Clock size={16} style={{ color: '#059669' }} />
            <span>My Attendance</span>
            <span className="smart-button-count">{emp.attendanceCount}</span>
          </button>

          <button
            type="button"
            className="smart-button"
            onClick={() => navigate(`/contracts?employee=${encodeURIComponent(emp.name)}`)}
            title="Open My Contract Terms"
          >
            <FileSignature size={16} style={{ color: '#059669' }} />
            <span>My Contracts</span>
            <span className="smart-button-count">{emp.contractsCount}</span>
          </button>
        </div>

        {/* Form Card (Read-Only) */}
        <div className="odoo-form-card">
          <div className="odoo-form-header">
            <div className="form-profile-box">
              <div className="form-avatar-circle">{emp.initials}</div>
              <div className="form-title-group">
                <h2>{emp.name}</h2>
                <p className="form-title-sub">
                  {emp.jobPosition} • {emp.department} &nbsp;|&nbsp; {emp.workEmail} &nbsp;|&nbsp; {emp.phone}
                </p>
              </div>
            </div>

            <div className="status-pill active" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
              <Info size={13} />
              <span>Read-Only Profile</span>
            </div>
          </div>

          <div className="form-tabs">
            <button
              type="button"
              className={`form-tab-btn ${activeTab === 'work' ? 'active' : ''}`}
              onClick={() => setActiveTab('work')}
            >
              Work Information
            </button>
            <button
              type="button"
              className={`form-tab-btn ${activeTab === 'private' ? 'active' : ''}`}
              onClick={() => setActiveTab('private')}
            >
              Private Information
            </button>
          </div>

          {activeTab === 'work' ? (
            <div className="form-grid-2col">
              <div className="field-group">
                <label className="field-label">Department</label>
                <input className="field-input" value={emp.department} readOnly />
              </div>
              <div className="field-group">
                <label className="field-label">Job Position</label>
                <input className="field-input" value={emp.jobPosition} readOnly />
              </div>
              <div className="field-group">
                <label className="field-label">Reporting Manager</label>
                <input className="field-input" value={emp.manager} readOnly />
              </div>
              <div className="field-group">
                <label className="field-label">Work Location</label>
                <input className="field-input" value={emp.workLocation} readOnly />
              </div>
              <div className="field-group">
                <label className="field-label">Working Schedule</label>
                <input className="field-input" value={emp.workingSchedule} readOnly />
              </div>
              <div className="field-group">
                <label className="field-label">Employment Status</label>
                <div>
                  <span className="status-pill active">● {emp.status}</span>
                </div>
              </div>
              <div className="field-group">
                <label className="field-label">Company</label>
                <input className="field-input" value={emp.company} readOnly />
              </div>
              <div className="field-group">
                <label className="field-label">Work Email</label>
                <input className="field-input" value={emp.workEmail} readOnly />
              </div>
            </div>
          ) : (
            <div className="form-grid-2col">
              <div className="field-group">
                <label className="field-label">Personal Phone</label>
                <input className="field-input" value={emp.phone} readOnly />
              </div>
              <div className="field-group">
                <label className="field-label">Bank Account Status</label>
                <div>
                  <span className="status-pill active">Verified</span>
                </div>
              </div>
              <div className="field-group">
                <label className="field-label">Nationality</label>
                <input className="field-input" value="Indian" readOnly />
              </div>
              <div className="field-group">
                <label className="field-label">Identification No / PAN</label>
                <input className="field-input" value="ABCDE1234F" readOnly />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.jobPosition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // FORM VIEW (Requirement A1: Form view with essential work details and direct smart button links)
  if (selectedEmployee) {
    const counts = getEmpCounts(selectedEmployee.name);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Back and Action bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              className="btn-action-primary"
              style={{ backgroundColor: '#FFFFFF', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}
              onClick={() => setSelectedEmployee(null)}
            >
              <ArrowLeft size={16} />
              <span>Employees</span>
            </button>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{selectedEmployee.name}</span>
          </div>

          {/* Smart Buttons with direct filtering links (Requirement A1) */}
          <div className="smart-buttons-bar" style={{ margin: 0 }}>
            <button
              type="button"
              className="smart-button"
              onClick={() => navigate(`/contracts?employee=${encodeURIComponent(selectedEmployee.name)}`)}
              title="Filter and view related Contracts"
            >
              <FileSignature size={16} style={{ color: '#059669' }} />
              <span>Contracts</span>
              <span className="smart-button-count">{counts.contractsCount}</span>
            </button>

            <button
              type="button"
              className="smart-button"
              onClick={() => navigate(`/attendance?employee=${encodeURIComponent(selectedEmployee.name)}`)}
              title="Filter and view related Attendance"
            >
              <Clock size={16} style={{ color: '#059669' }} />
              <span>Attendance</span>
              <span className="smart-button-count">{counts.attendanceCount}</span>
            </button>

            <button
              type="button"
              className="smart-button"
              onClick={() => navigate(`/timeoff/requests?employee=${encodeURIComponent(selectedEmployee.name)}`)}
              title="Filter and view related Time Off records"
            >
              <CalendarDays size={16} style={{ color: '#059669' }} />
              <span>Time Off</span>
              <span className="smart-button-count">{counts.timeOffCount}</span>
            </button>

            <button
              type="button"
              className="smart-button"
              onClick={() => navigate(`/timeoff/allocations?employee=${encodeURIComponent(selectedEmployee.name)}`)}
              title="Filter and view related Allocations"
            >
              <Shield size={16} style={{ color: '#059669' }} />
              <span>Allocations</span>
            </button>
          </div>
        </div>

        {/* Form Card */}
        <div className="odoo-form-card">
          <div className="odoo-form-header">
            <div className="form-profile-box">
              <div className="form-avatar-circle">{selectedEmployee.initials}</div>
              <div className="form-title-group">
                <h2>{selectedEmployee.name}</h2>
                <p className="form-title-sub">
                  {selectedEmployee.jobPosition} • {selectedEmployee.department} &nbsp;|&nbsp; {selectedEmployee.workEmail} &nbsp;|&nbsp; {selectedEmployee.phone}
                </p>
              </div>
            </div>

            {canCreateEmployee && (
              <button
                type="button"
                className="btn-action-primary"
                onClick={() => handleOpenEditModal(selectedEmployee)}
              >
                <Edit2 size={15} />
                <span>EDIT</span>
              </button>
            )}
          </div>

          <div className="form-tabs">
            <button
              type="button"
              className={`form-tab-btn ${activeTab === 'work' ? 'active' : ''}`}
              onClick={() => setActiveTab('work')}
            >
              Work Information
            </button>
            <button
              type="button"
              className={`form-tab-btn ${activeTab === 'private' ? 'active' : ''}`}
              onClick={() => setActiveTab('private')}
            >
              Private Information
            </button>
          </div>

          {activeTab === 'work' ? (
            <div className="form-grid-2col">
              <div className="field-group">
                <label className="field-label">Department</label>
                <input className="field-input" value={selectedEmployee.department} readOnly />
              </div>

              <div className="field-group">
                <label className="field-label">Job Position</label>
                <input className="field-input" value={selectedEmployee.jobPosition} readOnly />
              </div>

              <div className="field-group">
                <label className="field-label">Reporting Manager</label>
                <input className="field-input" value={selectedEmployee.manager} readOnly />
              </div>

              <div className="field-group">
                <label className="field-label">Work Location</label>
                <input className="field-input" value={selectedEmployee.workLocation || 'Mumbai'} readOnly />
              </div>

              <div className="field-group">
                <label className="field-label">Working Schedule (A3 Assigned)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input className="field-input" value={selectedEmployee.workingSchedule} readOnly />
                  <button
                    type="button"
                    className="btn-action-primary"
                    style={{ backgroundColor: '#F1F5F9', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)', padding: '6px 10px', fontSize: '0.75rem' }}
                    onClick={() => navigate('/schedules')}
                    title="View Schedule pattern"
                  >
                    View Schedule
                  </button>
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">Employment Status</label>
                <div>
                  <span className="status-pill active">● {selectedEmployee.status}</span>
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">Employment Type</label>
                <input className="field-input" value={selectedEmployee.employmentType || 'Full-time'} readOnly />
              </div>

              <div className="field-group">
                <label className="field-label">Company</label>
                <input className="field-input" value={selectedEmployee.company || 'OxP Pvt Ltd'} readOnly />
              </div>

              <div className="field-group">
                <label className="field-label">Work Email</label>
                <input className="field-input" value={selectedEmployee.workEmail} readOnly />
              </div>
            </div>
          ) : (
            <div className="form-grid-2col">
              <div className="field-group">
                <label className="field-label">Personal Phone</label>
                <input className="field-input" value={selectedEmployee.phone} readOnly />
              </div>
              <div className="field-group">
                <label className="field-label">Bank Account Status</label>
                <div>
                  <span className={`status-pill ${selectedEmployee.bankAccount ? 'active' : 'draft'}`}>
                    {selectedEmployee.bankAccount ? `● Registered: ${selectedEmployee.bankAccount}` : '⚠ Missing Bank Account'}
                  </span>
                </div>
              </div>
              <div className="field-group">
                <label className="field-label">Nationality</label>
                <input className="field-input" value="Indian" readOnly />
              </div>
              <div className="field-group">
                <label className="field-label">Identification No / PAN</label>
                <input className="field-input" value="ABCDE1234F" readOnly />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // KANBAN & LIST VIEWS
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
          Employees
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          {viewMode === 'kanban' ? 'Default view: Kanban' : 'List view for sort, filter and bulk scanning'}
        </p>
      </div>

      <div className="odoo-control-bar">
        <div className="control-bar-left">
          {canCreateEmployee && (
            <button type="button" className="btn-action-primary" onClick={handleOpenCreateModal}>
              <Plus size={16} />
              <span>NEW</span>
            </button>
          )}

          <div className="search-input-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="control-bar-right">
          <div className="view-toggle-group">
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === 'kanban' ? 'active' : ''}`}
              onClick={() => setSearchParams({ view: 'kanban' })}
            >
              <LayoutGrid size={15} />
              <span>Kanban</span>
            </button>
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setSearchParams({ view: 'list' })}
            >
              <List size={15} />
              <span>List</span>
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'kanban' ? (
        <div className="kanban-grid">
          {filteredEmployees.map((emp) => (
            <div
              key={emp.id}
              className="kanban-card"
              onClick={() => setSelectedEmployee(emp)}
            >
              <div className="kanban-card-top">
                <div className="kanban-avatar">{emp.initials}</div>
                <div className="kanban-info">
                  <h4>{emp.name}</h4>
                  <p>{emp.jobPosition}</p>
                </div>
              </div>

              <div className="kanban-card-footer">
                <span>{emp.department}</span>
                <span className="status-pill active" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
                  ● {emp.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="table-panel">
          <table className="odoo-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Work Email</th>
                <th>Job Position</th>
                <th>Department</th>
                <th>Schedule</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr
                  key={emp.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedEmployee(emp)}
                >
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{emp.name}</td>
                  <td>{emp.workEmail}</td>
                  <td>{emp.jobPosition}</td>
                  <td>{emp.department}</td>
                  <td>{emp.workingSchedule}</td>
                  <td>{emp.employmentType || 'Full-time'}</td>
                  <td>
                    <span className="status-pill active">● {emp.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* CREATE / EDIT EMPLOYEE MODAL */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div
            className="modal-content"
            style={{ maxWidth: '640px', width: '90%' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>
                {modalMode === 'create' ? 'Create Employee Master Record' : `Edit Employee / ${formData.name}`}
              </h3>
              <button
                type="button"
                className="btn-icon"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveModal}>
              <div className="modal-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', padding: '20px' }}>
                <div className="field-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="field-label">Full Name *</label>
                  <input
                    className="field-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Priya Sharma"
                    required
                  />
                </div>

                <div className="field-group">
                  <label className="field-label">Job Position *</label>
                  <input
                    className="field-input"
                    value={formData.jobPosition}
                    onChange={(e) => setFormData({ ...formData, jobPosition: e.target.value })}
                    placeholder="e.g. Senior Backend Engineer"
                    required
                  />
                </div>

                <div className="field-group">
                  <label className="field-label">Department *</label>
                  <select
                    className="field-input"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Finance">Finance</option>
                    <option value="HR">HR</option>
                    <option value="Sales">Sales</option>
                    <option value="Support">Support</option>
                  </select>
                </div>

                <div className="field-group">
                  <label className="field-label">Reporting Manager</label>
                  <input
                    className="field-input"
                    value={formData.manager}
                    onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                    placeholder="e.g. Meet Rathod"
                  />
                </div>

                <div className="field-group">
                  <label className="field-label">Working Schedule (A3 Setup) *</label>
                  <select
                    className="field-input"
                    value={formData.workingScheduleId}
                    onChange={(e) => setFormData({ ...formData, workingScheduleId: e.target.value })}
                  >
                    {workingSchedules.map((ws) => (
                      <option key={ws.id} value={ws.id}>
                        {ws.name} ({ws.weeklyHours || 40} hrs/wk)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field-group">
                  <label className="field-label">Employment Type</label>
                  <select
                    className="field-input"
                    value={formData.employmentType}
                    onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Intern">Intern</option>
                  </select>
                </div>

                <div className="field-group">
                  <label className="field-label">Status</label>
                  <select
                    className="field-input"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="Active">Active</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>

                <div className="field-group">
                  <label className="field-label">Work Email</label>
                  <input
                    type="email"
                    className="field-input"
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    placeholder="priya@oxp.com"
                  />
                </div>

                <div className="field-group">
                  <label className="field-label">Work Phone</label>
                  <input
                    className="field-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="field-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="field-label">Bank Account (for Payroll)</label>
                  <input
                    className="field-input"
                    value={formData.bankAccount}
                    onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                    placeholder="e.g. HDFC0001234 - 98765432100"
                  />
                </div>
              </div>

              <div className="modal-footer" style={{ padding: '14px 20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  className="btn-action-primary"
                  style={{ backgroundColor: '#FFFFFF', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-action-primary">
                  <Save size={15} />
                  <span>Save Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
