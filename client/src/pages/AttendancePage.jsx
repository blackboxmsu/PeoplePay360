import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Search, Plus, ArrowLeft, Edit2, Clock, CheckCircle2, Shield } from 'lucide-react';

const INITIAL_ATTENDANCE = [
  {
    id: 'att-rohan-1',
    employeeName: 'Rohan Patel',
    date: '02-Sep-2026',
    checkIn: '09:00',
    checkOut: '18:00',
    workedHours: '9.00',
    status: 'Present',
    department: 'Engineering',
    manager: 'Sara Khan',
    overtime: '0.00 hrs',
    notes: 'Regular engineering shift completed.'
  },
  {
    id: 'att-rohan-2',
    employeeName: 'Rohan Patel',
    date: '01-Sep-2026',
    checkIn: '09:05',
    checkOut: '18:15',
    workedHours: '9.17',
    status: 'Present',
    department: 'Engineering',
    manager: 'Sara Khan',
    overtime: '0.17 hrs',
    notes: 'On-time check-in recorded.'
  },
  {
    id: 'att-rohan-3',
    employeeName: 'Rohan Patel',
    date: '31-Aug-2026',
    checkIn: '09:12',
    checkOut: '18:00',
    workedHours: '8.80',
    status: 'Present',
    department: 'Engineering',
    manager: 'Sara Khan',
    overtime: '0.00 hrs',
    notes: 'Shift completed.'
  },
  {
    id: 'att-1',
    employeeName: 'Aarav Mehta',
    date: '02-Sep-2026',
    checkIn: '09:05',
    checkOut: '18:10',
    workedHours: '9.08',
    status: 'Present',
    department: 'Finance',
    manager: 'Sara Khan',
    overtime: '0.50 hrs',
    notes: 'System-generated from check in/out or manually corrected by an authorized user.'
  },
  {
    id: 'att-2',
    employeeName: 'Sara Khan',
    date: '02-Sep-2026',
    checkIn: '09:15',
    checkOut: '18:02',
    workedHours: '8.78',
    status: 'Present',
    department: 'HR',
    manager: 'Aditi Roy',
    overtime: '0.00 hrs',
    notes: 'Standard daily shift completed.'
  },
  {
    id: 'att-3',
    employeeName: 'John Dsouza',
    date: '02-Sep-2026',
    checkIn: '09:32',
    checkOut: '17:58',
    workedHours: '8.43',
    status: 'Present',
    department: 'Engineering',
    manager: 'Rahul Verma',
    overtime: '0.00 hrs',
    notes: 'Normal developer shift.'
  },
  {
    id: 'att-4',
    employeeName: 'Neha Patel',
    date: '02-Sep-2026',
    checkIn: '—',
    checkOut: '—',
    workedHours: '0.00',
    status: 'Absent',
    department: 'HR',
    manager: 'Sara Khan',
    overtime: '0.00 hrs',
    notes: 'Unplanned absence / no punch recorded.'
  }
];

export default function AttendancePage() {
  const { user, isEmployeeSelf, canManageHR } = useAuth();
  const userName = user?.name || 'Rohan Patel';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  // Filter records based on role authorization
  // If role is employee, ONLY show current user's records!
  const baseList = isEmployeeSelf
    ? INITIAL_ATTENDANCE.filter(a => a.employeeName.toLowerCase() === userName.toLowerCase())
    : INITIAL_ATTENDANCE;

  const filteredAttendance = baseList.filter(a => {
    const matchesSearch = a.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.date.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeFilter === 'today') return matchesSearch && a.date.includes('02-Sep');
    return matchesSearch;
  });

  // Form View (Screenshot 3)
  if (selectedAttendance) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              className="btn-action-primary"
              style={{ backgroundColor: '#FFFFFF', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}
              onClick={() => setSelectedAttendance(null)}
            >
              <ArrowLeft size={16} />
              <span>Attendance</span>
            </button>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
              {selectedAttendance.employeeName} / {selectedAttendance.date}
            </span>
          </div>

          {canManageHR && (
            <button type="button" className="btn-action-primary">
              <Edit2 size={15} />
              <span>EDIT</span>
            </button>
          )}
        </div>

        <div className="odoo-form-card">
          <div className="odoo-form-header">
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                Attendance / {selectedAttendance.employeeName} / {selectedAttendance.date}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {isEmployeeSelf ? 'Personal attendance punch record' : 'Form view of attendance record'}
              </p>
            </div>
            <span className={`status-pill ${selectedAttendance.status === 'Present' ? 'active' : 'expired'}`}>
              ● {selectedAttendance.status}
            </span>
          </div>

          <div className="form-grid-2col">
            <div className="field-group">
              <label className="field-label">Employee</label>
              <input className="field-input" value={selectedAttendance.employeeName} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Department</label>
              <input className="field-input" value={selectedAttendance.department} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Check In</label>
              <input className="field-input" value={`${selectedAttendance.date} ${selectedAttendance.checkIn}`} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Manager</label>
              <input className="field-input" value={selectedAttendance.manager} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Check Out</label>
              <input className="field-input" value={`${selectedAttendance.date} ${selectedAttendance.checkOut}`} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Status</label>
              <div>
                <span className={`status-pill ${selectedAttendance.status === 'Present' ? 'active' : 'expired'}`}>
                  ● {selectedAttendance.status}
                </span>
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Worked Hours</label>
              <input className="field-input" value={selectedAttendance.workedHours} readOnly style={{ fontWeight: 700, color: '#059669' }} />
            </div>

            <div className="field-group">
              <label className="field-label">Overtime</label>
              <input className="field-input" value={selectedAttendance.overtime} readOnly />
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--bg-green-soft)', border: '1px solid var(--border-green)', borderRadius: 'var(--radius-lg)', padding: '16px', marginTop: '12px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#064E3B', marginBottom: '6px' }}>Notes</h4>
            <p style={{ fontSize: '0.8rem', color: '#047857' }}>{selectedAttendance.notes}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          {isEmployeeSelf ? 'My Attendance Log' : 'Attendance'}
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          {isEmployeeSelf
            ? `Viewing personal presence records for ${userName} (Strict self-service access)`
            : 'List view of employee attendance records with quick date and person filters'
          }
        </p>
      </div>

      <div className="odoo-control-bar">
        <div className="control-bar-left">
          {canManageHR && (
            <button type="button" className="btn-action-primary">
              <Plus size={16} />
              <span>NEW</span>
            </button>
          )}

          <div className="search-input-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search by date or note..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="btn-action-primary"
            style={{
              backgroundColor: activeFilter === 'all' ? 'var(--bg-green-soft)' : '#FFFFFF',
              color: activeFilter === 'all' ? '#059669' : 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)'
            }}
            onClick={() => setActiveFilter('all')}
          >
            All Logs
          </button>

          <button
            type="button"
            className="btn-action-primary"
            style={{
              backgroundColor: activeFilter === 'today' ? 'var(--bg-green-soft)' : '#FFFFFF',
              color: activeFilter === 'today' ? '#059669' : 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)'
            }}
            onClick={() => setActiveFilter(activeFilter === 'today' ? 'all' : 'today')}
          >
            Today Only
          </button>
        </div>

        {isEmployeeSelf && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#059669', fontWeight: 600 }}>
            <Shield size={14} />
            <span>Private User View</span>
          </div>
        )}
      </div>

      <div className="table-panel">
        <table className="odoo-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Worked Hours</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendance.length > 0 ? (
              filteredAttendance.map((a) => (
                <tr
                  key={a.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedAttendance(a)}
                >
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{a.employeeName}</td>
                  <td>{a.date}</td>
                  <td>{a.checkIn}</td>
                  <td>{a.checkOut}</td>
                  <td style={{ fontWeight: 700, color: '#059669' }}>{a.workedHours} hrs</td>
                  <td>
                    <span className={`status-pill ${a.status === 'Present' ? 'active' : 'expired'}`}>
                      ● {a.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
                  No attendance records found for your account.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
