import React, { useState } from 'react';
import { Search, Plus, ArrowLeft, Edit2, Clock, CheckCircle2, Shield, X, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const INITIAL_ATTENDANCE = [
  {
    id: 'att-5',
    employeeName: 'Rohan Patel',
    date: '03-Sep-2026',
    checkIn: '09:02',
    checkOut: '18:00',
    workedHours: '8.97',
    status: 'Present',
    department: 'Engineering',
    manager: 'Sara Khan',
    overtime: '0.00 hrs',
    notes: 'Self-service mobile punch entry.'
  },
  {
    id: 'att-6',
    employeeName: 'Rohan Patel',
    date: '02-Sep-2026',
    checkIn: '08:58',
    checkOut: '18:15',
    workedHours: '9.28',
    status: 'Present',
    department: 'Engineering',
    manager: 'Sara Khan',
    overtime: '0.25 hrs',
    notes: 'Extended sprint deployment.'
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
  const { user, isEmployee, canManageHR } = useAuth();
  const [attendanceList, setAttendanceList] = useState(INITIAL_ATTENDANCE);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  // Create attendance entry modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDate, setNewDate] = useState('2026-09-04');
  const [newCheckIn, setNewCheckIn] = useState('09:00');
  const [newCheckOut, setNewCheckOut] = useState('18:00');
  const [newNotes, setNewNotes] = useState('');

  const handleCreateAttendance = (e) => {
    e.preventDefault();

    // Calculate approximate worked hours
    const [inH, inM] = newCheckIn.split(':').map(Number);
    const [outH, outM] = newCheckOut.split(':').map(Number);
    let diffHours = (outH + outM / 60) - (inH + inM / 60);
    if (diffHours < 0) diffHours = 8.0;

    const empName = isEmployee ? (user?.name || 'Rohan Patel') : 'Sara Khan';

    const newRecord = {
      id: `att-${Date.now()}`,
      employeeName: empName,
      date: newDate,
      checkIn: newCheckIn,
      checkOut: newCheckOut,
      workedHours: diffHours.toFixed(2),
      status: 'Present',
      department: isEmployee ? 'Engineering' : 'HR',
      manager: 'Sara Khan',
      overtime: diffHours > 8.0 ? `${(diffHours - 8.0).toFixed(2)} hrs` : '0.00 hrs',
      notes: newNotes || 'Self-recorded punch entry via PeoplePay360.'
    };

    setAttendanceList([newRecord, ...attendanceList]);
    setIsModalOpen(false);
    setSelectedAttendance(newRecord);
  };

  const filteredAttendance = attendanceList.filter(a => {
    // If ordinary employee, only view own attendance records
    if (isEmployee) {
      const currentUserName = (user?.name || 'Rohan Patel').toLowerCase();
      const isSelf = a.employeeName.toLowerCase().includes(currentUserName) ||
                     a.employeeName.toLowerCase().includes('rohan');
      return isSelf && a.employeeName.toLowerCase().includes(searchTerm.toLowerCase());
    }

    const matchesSearch = a.employeeName.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeFilter === 'aarav') return matchesSearch && a.employeeName === 'Aarav Mehta';
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

          {/* Edit restricted to HR Administration roles */}
          {canManageHR ? (
            <button type="button" className="btn-action-primary">
              <Edit2 size={15} />
              <span>EDIT</span>
            </button>
          ) : (
            <span className="status-pill active" style={{ fontSize: '0.75rem' }}>
              <Shield size={12} />
              <span>Employee Record (No HR Admin Edit)</span>
            </span>
          )}
        </div>

        <div className="odoo-form-card">
          <div className="odoo-form-header">
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                Attendance / {selectedAttendance.employeeName} / {selectedAttendance.date}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Form view of one attendance record</p>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            {isEmployee ? 'My Attendance Records' : 'Attendance'}
          </h1>
          {isEmployee && (
            <span className="status-pill active" style={{ fontSize: '0.75rem' }}>
              <Shield size={12} />
              <span>Self-Service</span>
            </span>
          )}
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          {isEmployee
            ? 'Personal attendance history and work duration. Click NEW to record an entry.'
            : 'Company attendance records with quick date and person filters'}
        </p>
      </div>

      <div className="odoo-control-bar">
        <div className="control-bar-left">
          <button
            type="button"
            className="btn-action-primary"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={16} />
            <span>NEW ENTRY</span>
          </button>

          <div className="search-input-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search attendance..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {!isEmployee && (
            <>
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
                Today
              </button>

              <button
                type="button"
                className="btn-action-primary"
                style={{
                  backgroundColor: activeFilter === 'aarav' ? 'var(--bg-green-soft)' : '#FFFFFF',
                  color: activeFilter === 'aarav' ? '#059669' : 'var(--text-secondary)',
                  border: '1px solid var(--border-subtle)'
                }}
                onClick={() => setActiveFilter(activeFilter === 'aarav' ? 'all' : 'aarav')}
              >
                Employee: Aarav
              </button>
            </>
          )}
        </div>
      </div>

      <div className="table-panel">
        <table className="odoo-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Worked Hours</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendance.map((a) => (
              <tr
                key={a.id}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedAttendance(a)}
              >
                <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{a.employeeName}</td>
                <td>{a.checkIn}</td>
                <td>{a.checkOut}</td>
                <td style={{ fontWeight: 700, color: '#059669' }}>{a.workedHours}</td>
                <td>
                  <span className={`status-pill ${a.status === 'Present' ? 'active' : 'expired'}`}>
                    ● {a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Attendance Entry Modal (Employee & HR) */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-dialog" style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={18} style={{ color: '#059669' }} />
                <h3 className="modal-title">Record Attendance Entry</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94A3B8' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateAttendance}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="field-group">
                  <label className="field-label">Employee</label>
                  <input
                    className="field-input"
                    value={isEmployee ? (user?.name || 'Rohan Patel') : 'Sara Khan'}
                    readOnly
                    style={{ backgroundColor: '#F8FAFC' }}
                  />
                </div>

                <div className="field-group">
                  <label className="field-label">Date *</label>
                  <input
                    type="date"
                    className="field-input"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    required
                  />
                </div>

                <div className="form-grid-2col">
                  <div className="field-group">
                    <label className="field-label">Check In Time *</label>
                    <input
                      type="time"
                      className="field-input"
                      value={newCheckIn}
                      onChange={(e) => setNewCheckIn(e.target.value)}
                      required
                    />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Check Out Time *</label>
                    <input
                      type="time"
                      className="field-input"
                      value={newCheckOut}
                      onChange={(e) => setNewCheckOut(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="field-group">
                  <label className="field-label">Work Notes</label>
                  <textarea
                    className="field-input"
                    rows={2}
                    placeholder="e.g. Regular workday, sprint tasks, client support"
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    style={{ resize: 'none' }}
                  />
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
                >
                  <CheckCircle2 size={16} />
                  <span>Save Entry</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
