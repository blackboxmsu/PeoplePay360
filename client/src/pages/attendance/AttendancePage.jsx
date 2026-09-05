import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import store from '../../services/dataStore';
import { Search, Plus, ArrowLeft, Edit2, Clock, CheckCircle2, Shield, Save, X } from 'lucide-react';

export default function AttendancePage() {
  const { user, role, isEmployeeSelf } = useAuth();
  const userName = user?.name || 'Rohan Patel';
  const canManageAttendance = ['hr_manager', 'admin'].includes(role);

  const [attendanceList, setAttendanceList] = useState(store.getAttendance());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  // Edit / Create Modal State for HR Manager / Admin
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: '',
    employeeName: '',
    date: '02-Sep-2026',
    checkIn: '09:00',
    checkOut: '18:00',
    workedHours: '9.00',
    status: 'Present',
    department: 'Finance',
    manager: 'Sara Khan',
    overtime: '0.00 hrs',
    notes: 'System-generated from check in/out or manually corrected by an authorized user.'
  });

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setAttendanceList([...store.getAttendance()]);
    });
    return unsub;
  }, []);

  // Filter records based on role authorization
  // If role is employee, ONLY show current user's records!
  const baseList = isEmployeeSelf
    ? attendanceList.filter(a => a.employeeName.toLowerCase() === userName.toLowerCase())
    : attendanceList;

  const filteredAttendance = baseList.filter(a => {
    const matchesSearch =
      (a.employeeName && a.employeeName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (a.date && a.date.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (a.notes && a.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    if (activeFilter === 'today') return matchesSearch && a.date.includes('02-Sep');
    return matchesSearch;
  });

  const handleOpenEdit = (rec) => {
    setEditFormData({
      ...rec,
      notes: rec.notes || 'System-generated from check in/out or manually corrected by an authorized user.'
    });
    setIsEditModalOpen(true);
  };

  const handleOpenCreate = () => {
    setEditFormData({
      id: `att-${Date.now()}`,
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
    });
    setIsEditModalOpen(true);
  };

  const handleSaveAttendance = (e) => {
    e.preventDefault();
    if (!canManageAttendance) return;
    store.saveAttendance(editFormData);
    if (selectedAttendance && selectedAttendance.id === editFormData.id) {
      setSelectedAttendance(editFormData);
    }
    setIsEditModalOpen(false);
  };

  // Form View (Matching screenshot: Attendance / Aarav Mehta / 02-Sep-2026)
  if (selectedAttendance) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
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

          {canManageAttendance && (
            <button
              type="button"
              className="btn-action-primary"
              onClick={() => handleOpenEdit(selectedAttendance)}
            >
              <Edit2 size={15} />
              <span>EDIT</span>
            </button>
          )}
        </div>

        <div className="odoo-form-card">
          <div className="odoo-form-header">
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                Attendance / {selectedAttendance.employeeName} / {selectedAttendance.date}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Form view of one attendance record
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
              <input className="field-input" value={selectedAttendance.department || 'General'} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Check In</label>
              <input
                className="field-input"
                value={`${selectedAttendance.date} ${selectedAttendance.checkIn}`}
                readOnly
              />
            </div>

            <div className="field-group">
              <label className="field-label">Manager</label>
              <input className="field-input" value={selectedAttendance.manager || 'Sara Khan'} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Check Out</label>
              <input
                className="field-input"
                value={selectedAttendance.checkOut && selectedAttendance.checkOut !== '—' ? `${selectedAttendance.date} ${selectedAttendance.checkOut}` : '—'}
                readOnly
              />
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
              <input
                className="field-input"
                value={selectedAttendance.workedHours}
                readOnly
                style={{ fontWeight: 700, color: '#059669' }}
              />
            </div>

            <div className="field-group">
              <label className="field-label">Overtime</label>
              <input className="field-input" value={selectedAttendance.overtime || '0.00 hrs'} readOnly />
            </div>
          </div>

          {/* Notes Section with System Generated disclaimer (Exactly as shown in user image) */}
          <div style={{ backgroundColor: '#F8FAFC', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '16px', marginTop: '16px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
              Notes
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              {selectedAttendance.notes || 'System-generated from check in/out or manually corrected by an authorized user.'}
            </p>
          </div>

          {/* Useful Note annotation (from user image) */}
          <div style={{ marginTop: '10px', fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
            Useful note: worked hours and overtime should be easy to read because they may later influence payroll or reporting.
          </div>
        </div>

        {/* HR Manager / Admin Edit Modal */}
        {isEditModalOpen && (
          <div className="modal-overlay">
            <div className="modal-dialog" style={{ maxWidth: '520px' }}>
              <div className="modal-header">
                <h3 className="modal-title">Edit Attendance Record</h3>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94A3B8' }}
                >
                  <X size={18} />
                </button>
              </div>
              <form onSubmit={handleSaveAttendance}>
                <div className="modal-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="field-group" style={{ gridColumn: '1 / -1' }}>
                    <label className="field-label">Employee Name *</label>
                    <input
                      className="field-input"
                      value={editFormData.employeeName}
                      onChange={(e) => setEditFormData({ ...editFormData, employeeName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Date *</label>
                    <input
                      className="field-input"
                      value={editFormData.date}
                      onChange={(e) => setEditFormData({ ...editFormData, date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Status *</label>
                    <select
                      className="field-input"
                      value={editFormData.status}
                      onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                    >
                      <option value="Present">Present</option>
                      <option value="Late">Late</option>
                      <option value="Absent">Absent</option>
                    </select>
                  </div>
                  <div className="field-group">
                    <label className="field-label">Check In</label>
                    <input
                      className="field-input"
                      value={editFormData.checkIn}
                      onChange={(e) => setEditFormData({ ...editFormData, checkIn: e.target.value })}
                    />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Check Out</label>
                    <input
                      className="field-input"
                      value={editFormData.checkOut}
                      onChange={(e) => setEditFormData({ ...editFormData, checkOut: e.target.value })}
                    />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Worked Hours</label>
                    <input
                      className="field-input"
                      value={editFormData.workedHours}
                      onChange={(e) => setEditFormData({ ...editFormData, workedHours: e.target.value })}
                    />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Overtime</label>
                    <input
                      className="field-input"
                      value={editFormData.overtime}
                      onChange={(e) => setEditFormData({ ...editFormData, overtime: e.target.value })}
                    />
                  </div>
                  <div className="field-group" style={{ gridColumn: '1 / -1' }}>
                    <label className="field-label">Notes</label>
                    <textarea
                      className="field-input"
                      rows={2}
                      value={editFormData.notes}
                      onChange={(e) => setEditFormData({ ...editFormData, notes: e.target.value })}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn-status-action"
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-action-primary">
                    <Save size={15} />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Attendance List View
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
          {/* Only HR Manager & Admin can manually create attendance */}
          {canManageAttendance && (
            <button type="button" className="btn-action-primary" onClick={handleOpenCreate}>
              <Plus size={16} />
              <span>NEW</span>
            </button>
          )}

          <div className="search-input-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search by employee, date or note..."
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
            All Logs ({baseList.length})
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

      {/* HR Manager / Admin Edit Modal for List View */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-dialog" style={{ maxWidth: '520px' }}>
            <div className="modal-header">
              <h3 className="modal-title">{editFormData.id ? 'Edit Attendance' : 'Create Attendance Record'}</h3>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94A3B8' }}
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSaveAttendance}>
              <div className="modal-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="field-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="field-label">Employee Name *</label>
                  <input
                    className="field-input"
                    value={editFormData.employeeName}
                    onChange={(e) => setEditFormData({ ...editFormData, employeeName: e.target.value })}
                    required
                  />
                </div>
                <div className="field-group">
                  <label className="field-label">Date *</label>
                  <input
                    className="field-input"
                    value={editFormData.date}
                    onChange={(e) => setEditFormData({ ...editFormData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="field-group">
                  <label className="field-label">Status *</label>
                  <select
                    className="field-input"
                    value={editFormData.status}
                    onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                  >
                    <option value="Present">Present</option>
                    <option value="Late">Late</option>
                    <option value="Absent">Absent</option>
                  </select>
                </div>
                <div className="field-group">
                  <label className="field-label">Check In</label>
                  <input
                    className="field-input"
                    value={editFormData.checkIn}
                    onChange={(e) => setEditFormData({ ...editFormData, checkIn: e.target.value })}
                  />
                </div>
                <div className="field-group">
                  <label className="field-label">Check Out</label>
                  <input
                    className="field-input"
                    value={editFormData.checkOut}
                    onChange={(e) => setEditFormData({ ...editFormData, checkOut: e.target.value })}
                  />
                </div>
                <div className="field-group">
                  <label className="field-label">Worked Hours</label>
                  <input
                    className="field-input"
                    value={editFormData.workedHours}
                    onChange={(e) => setEditFormData({ ...editFormData, workedHours: e.target.value })}
                  />
                </div>
                <div className="field-group">
                  <label className="field-label">Overtime</label>
                  <input
                    className="field-input"
                    value={editFormData.overtime}
                    onChange={(e) => setEditFormData({ ...editFormData, overtime: e.target.value })}
                  />
                </div>
                <div className="field-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="field-label">Notes</label>
                  <textarea
                    className="field-input"
                    rows={2}
                    value={editFormData.notes}
                    onChange={(e) => setEditFormData({ ...editFormData, notes: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-status-action"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-action-primary">
                  <Save size={15} />
                  <span>Save</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
