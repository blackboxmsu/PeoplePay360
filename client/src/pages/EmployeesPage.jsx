import React, { useState } from 'react';
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
  UserCheck
} from 'lucide-react';

const INITIAL_EMPLOYEES = [
  {
    id: 'emp-1',
    initials: 'AM',
    name: 'Aarav Mehta',
    jobPosition: 'Payroll Specialist',
    department: 'Finance',
    manager: 'Sara Khan',
    workingSchedule: '40 Hours / Week',
    company: 'OxP Pvt Ltd',
    workLocation: 'Mumbai',
    status: 'Active',
    workEmail: 'aarav@oxp.com',
    phone: '+91 98765 43210',
    contractsCount: 2,
    attendanceCount: 14,
    timeOffCount: 3
  },
  {
    id: 'emp-2',
    initials: 'SK',
    name: 'Sara Khan',
    jobPosition: 'HR Officer',
    department: 'HR',
    manager: 'Aditi Roy',
    workingSchedule: '40 Hours / Week',
    company: 'OxP Pvt Ltd',
    workLocation: 'Bangalore',
    status: 'Active',
    workEmail: 'sara@oxp.com',
    phone: '+91 98765 43211',
    contractsCount: 1,
    attendanceCount: 12,
    timeOffCount: 2
  },
  {
    id: 'emp-3',
    initials: 'JD',
    name: 'John Dsouza',
    jobPosition: 'Developer',
    department: 'Engineering',
    manager: 'Rahul Verma',
    workingSchedule: '40 Hours / Week',
    company: 'OxP Pvt Ltd',
    workLocation: 'Pune',
    status: 'Active',
    workEmail: 'john@oxp.com',
    phone: '+91 98765 43212',
    contractsCount: 2,
    attendanceCount: 15,
    timeOffCount: 1
  },
  {
    id: 'emp-4',
    initials: 'NP',
    name: 'Neha Patel',
    jobPosition: 'Recruiter',
    department: 'HR',
    manager: 'Sara Khan',
    workingSchedule: '40 Hours / Week',
    company: 'OxP Pvt Ltd',
    workLocation: 'Mumbai',
    status: 'Active',
    workEmail: 'neha@oxp.com',
    phone: '+91 98765 43213',
    contractsCount: 1,
    attendanceCount: 10,
    timeOffCount: 4
  }
];

export default function EmployeesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const viewMode = searchParams.get('view') || 'kanban';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [activeTab, setActiveTab] = useState('work'); // 'work' | 'private'

  const filteredEmployees = INITIAL_EMPLOYEES.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.jobPosition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If an employee is selected, render the Form View (Screenshot 2)
  if (selectedEmployee) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Back and Action bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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

          {/* Smart Buttons on top right (Screenshot 2) */}
          <div className="smart-buttons-bar" style={{ margin: 0 }}>
            <button
              type="button"
              className="smart-button"
              onClick={() => navigate('/timeoff/requests')}
              title="Open Time Off records"
            >
              <CalendarDays size={16} style={{ color: '#059669' }} />
              <span>Time Off</span>
              <span className="smart-button-count">{selectedEmployee.timeOffCount}</span>
            </button>

            <button
              type="button"
              className="smart-button"
              onClick={() => navigate('/contracts')}
              title="Open Contracts"
            >
              <FileSignature size={16} style={{ color: '#059669' }} />
              <span>Contracts</span>
              <span className="smart-button-count">{selectedEmployee.contractsCount}</span>
            </button>

            <button
              type="button"
              className="smart-button"
              onClick={() => navigate('/attendance')}
              title="Open Attendance"
            >
              <Clock size={16} style={{ color: '#059669' }} />
              <span>Attendance</span>
              <span className="smart-button-count">{selectedEmployee.attendanceCount}</span>
            </button>
          </div>
        </div>

        {/* Form Card */}
        <div className="odoo-form-card">
          <div className="odoo-form-header">
            <div className="form-profile-box">
              <div className="form-avatar-circle">
                {selectedEmployee.initials}
              </div>
              <div className="form-title-group">
                <h2>{selectedEmployee.name}</h2>
                <p className="form-title-sub">
                  {selectedEmployee.jobPosition} • {selectedEmployee.department} &nbsp;|&nbsp; {selectedEmployee.workEmail} &nbsp;|&nbsp; {selectedEmployee.phone}
                </p>
              </div>
            </div>

            <button type="button" className="btn-action-primary">
              <Edit2 size={15} />
              <span>EDIT</span>
            </button>
          </div>

          {/* Tabs */}
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

          {/* Tab Content */}
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
                <label className="field-label">Manager</label>
                <input className="field-input" value={selectedEmployee.manager} readOnly />
              </div>

              <div className="field-group">
                <label className="field-label">Work Location</label>
                <input className="field-input" value={selectedEmployee.workLocation} readOnly />
              </div>

              <div className="field-group">
                <label className="field-label">Working Schedule</label>
                <input className="field-input" value={selectedEmployee.workingSchedule} readOnly />
              </div>

              <div className="field-group">
                <label className="field-label">Status</label>
                <div>
                  <span className="status-pill active">● {selectedEmployee.status}</span>
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">Company</label>
                <input className="field-input" value={selectedEmployee.company} readOnly />
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

  // Otherwise, render List or Kanban (Screenshot 2)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Top Title */}
      <div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Employees
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          {viewMode === 'kanban' ? 'Default view: Kanban' : 'List view for sort, filter and bulk scanning'}
        </p>
      </div>

      {/* Control Bar: NEW + Search + Kanban/List toggle */}
      <div className="odoo-control-bar">
        <div className="control-bar-left">
          <button type="button" className="btn-action-primary">
            <Plus size={16} />
            <span>NEW</span>
          </button>

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

      {/* Kanban View */}
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
        /* List View */
        <div className="table-panel">
          <table className="odoo-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Work Email</th>
                <th>Job Position</th>
                <th>Department</th>
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
                  <td>
                    <span className="status-pill active">● {emp.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
