import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Search, Plus, ArrowLeft, Check, X, Shield, CalendarPlus } from 'lucide-react';

const INITIAL_REQUESTS = [
  {
    id: 'req-rohan-1',
    employeeName: 'Rohan Patel',
    type: 'Comp Off',
    startDate: '10-Sep-2026',
    endDate: '10-Sep-2026',
    duration: '1 Day',
    status: 'To Approve',
    approver: 'Sara Khan',
    allocationUsed: 'Comp Off Balance (2d remaining)',
    reason: 'Weekend release deployment support'
  },
  {
    id: 'req-rohan-2',
    employeeName: 'Rohan Patel',
    type: 'Paid Time Off',
    startDate: '15-Aug-2026',
    endDate: '18-Aug-2026',
    duration: '4 Days',
    status: 'Approved',
    approver: 'Sara Khan',
    allocationUsed: 'Paid Time Off 2026',
    reason: 'Annual family festival leave'
  },
  {
    id: 'req-1',
    employeeName: 'Aarav Mehta',
    type: 'Paid Time Off',
    startDate: '12-Sep-2026',
    endDate: '14-Sep-2026',
    duration: '3 Days',
    status: 'Approved',
    approver: 'Sara Khan',
    allocationUsed: 'Paid Time Off 2026',
    reason: 'Family vacation'
  },
  {
    id: 'req-2',
    employeeName: 'Sara Khan',
    type: 'Sick Leave',
    startDate: '18-Sep-2026',
    endDate: '18-Sep-2026',
    duration: '1 Day',
    status: 'Approved',
    approver: 'Aditi Roy',
    allocationUsed: 'None (Direct)',
    reason: 'Doctor consultation'
  },
  {
    id: 'req-3',
    employeeName: 'John Dsouza',
    type: 'Comp Off',
    startDate: '27-Sep-2026',
    endDate: '27-Sep-2026',
    duration: '1 Day',
    status: 'To Approve',
    approver: 'Rahul Verma',
    allocationUsed: 'Comp Off Balance',
    reason: 'Sprint migration support'
  }
];

export default function TimeOffRequestsPage() {
  const { user, isEmployeeSelf, canManageHR } = useAuth();
  const userName = user?.name || 'Rohan Patel';

  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);

  // New Request Modal state for employee self-service
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [newType, setNewType] = useState('Paid Time Off');
  const [newStartDate, setNewStartDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');
  const [newReason, setNewReason] = useState('');

  const handleStatusChange = (id, newStatus) => {
    // Only authorized HR can approve/refuse
    if (!canManageHR) return;
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest(prev => ({ ...prev, status: newStatus }));
    }
  };

  const handleCreateRequest = (e) => {
    e.preventDefault();
    if (!newStartDate || !newEndDate) return;

    const newReq = {
      id: `req-new-${Date.now()}`,
      employeeName: userName,
      type: newType,
      startDate: newStartDate,
      endDate: newEndDate,
      duration: '1 Day',
      status: 'To Approve',
      approver: 'Sara Khan',
      allocationUsed: `${newType} Balance`,
      reason: newReason || 'Personal leave request'
    };

    setRequests([newReq, ...requests]);
    setNewModalOpen(false);
    setSelectedRequest(newReq);
  };

  // Strictly filter list if employee role
  const baseList = isEmployeeSelf
    ? requests.filter(r => r.employeeName.toLowerCase() === userName.toLowerCase())
    : requests;

  const filtered = baseList.filter(r =>
    r.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Form View (Screenshot 5)
  if (selectedRequest) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              className="btn-action-primary"
              style={{ backgroundColor: '#FFFFFF', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}
              onClick={() => setSelectedRequest(null)}
            >
              <ArrowLeft size={16} />
              <span>Time Off Requests</span>
            </button>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
              {selectedRequest.employeeName}
            </span>
          </div>

          {/* Only HR Manager & Admin can Approve / Refuse */}
          {canManageHR && (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                className="btn-action-primary"
                style={{ backgroundColor: '#059669' }}
                onClick={() => handleStatusChange(selectedRequest.id, 'Approved')}
                disabled={selectedRequest.status === 'Approved'}
              >
                <Check size={15} />
                <span>Approve</span>
              </button>
              <button
                type="button"
                className="btn-action-primary"
                style={{ backgroundColor: '#DC2626' }}
                onClick={() => handleStatusChange(selectedRequest.id, 'Refused')}
                disabled={selectedRequest.status === 'Refused'}
              >
                <X size={15} />
                <span>Refuse</span>
              </button>
            </div>
          )}
        </div>

        <div className="odoo-form-card">
          <div className="odoo-form-header">
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                Time Off Request / {selectedRequest.employeeName}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {isEmployeeSelf ? 'Your submitted leave application' : 'Form view of one leave request'}
              </p>
            </div>
            <span className={`status-pill ${selectedRequest.status === 'Approved' ? 'active' : selectedRequest.status === 'To Approve' ? 'draft' : 'expired'}`}>
              ● {selectedRequest.status}
            </span>
          </div>

          <div className="form-grid-2col">
            <div className="field-group">
              <label className="field-label">Employee</label>
              <input className="field-input" value={selectedRequest.employeeName} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Duration</label>
              <input className="field-input" value={selectedRequest.duration} readOnly style={{ fontWeight: 700, color: '#059669' }} />
            </div>

            <div className="field-group">
              <label className="field-label">Time Off Type</label>
              <input className="field-input" value={selectedRequest.type} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Status</label>
              <div>
                <span className={`status-pill ${selectedRequest.status === 'Approved' ? 'active' : selectedRequest.status === 'To Approve' ? 'draft' : 'expired'}`}>
                  ● {selectedRequest.status}
                </span>
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Start Date</label>
              <input className="field-input" value={selectedRequest.startDate} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Assigned Approver</label>
              <input className="field-input" value={selectedRequest.approver} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">End Date</label>
              <input className="field-input" value={selectedRequest.endDate} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Allocation Deducted</label>
              <input className="field-input" value={selectedRequest.allocationUsed} readOnly />
            </div>
          </div>

          <div className="field-group" style={{ marginTop: '12px' }}>
            <label className="field-label">Reason</label>
            <textarea
              className="field-input"
              rows={3}
              value={selectedRequest.reason}
              readOnly
              style={{ resize: 'none' }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          {isEmployeeSelf ? 'My Leave Requests' : 'Time Off Requests'}
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          {isEmployeeSelf
            ? `Viewing personal leave transactions for ${userName} (Strict self-service access)`
            : 'List view opened from Time Off ▼ → Requests'
          }
        </p>
      </div>

      <div className="odoo-control-bar">
        <div className="control-bar-left">
          <button
            type="button"
            className="btn-action-primary"
            onClick={() => setNewModalOpen(true)}
          >
            <Plus size={16} />
            <span>New Leave Request</span>
          </button>

          <div className="search-input-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search by type or date..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isEmployeeSelf && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#059669', fontWeight: 600 }}>
            <Shield size={14} />
            <span>Personal Requests Only</span>
          </div>
        )}
      </div>

      <div className="table-panel">
        <table className="odoo-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Type</th>
              <th>Start</th>
              <th>End</th>
              <th>Duration</th>
              <th>Status</th>
              {canManageHR && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((r) => (
                <tr
                  key={r.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedRequest(r)}
                >
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{r.employeeName}</td>
                  <td>{r.type}</td>
                  <td>{r.startDate}</td>
                  <td>{r.endDate}</td>
                  <td style={{ fontWeight: 700, color: '#059669' }}>{r.duration}</td>
                  <td>
                    <span className={`status-pill ${r.status === 'Approved' ? 'active' : r.status === 'To Approve' ? 'draft' : 'expired'}`}>
                      ● {r.status}
                    </span>
                  </td>
                  {canManageHR && (
                    <td onClick={(e) => e.stopPropagation()}>
                      {r.status === 'To Approve' && (
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            type="button"
                            className="btn-status-action primary-flow"
                            style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                            onClick={() => handleStatusChange(r.id, 'Approved')}
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            className="btn-status-action"
                            style={{ padding: '4px 8px', fontSize: '0.75rem', color: '#DC2626' }}
                            onClick={() => handleStatusChange(r.id, 'Refused')}
                          >
                            Refuse
                          </button>
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={canManageHR ? 7 : 6} style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
                  No leave requests found for your account. Click 'New Leave Request' to apply.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* New Leave Request Modal for Employee */}
      {newModalOpen && (
        <div className="modal-overlay">
          <div className="modal-dialog" style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Apply for Time Off</h3>
              <button
                type="button"
                onClick={() => setNewModalOpen(false)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94A3B8' }}
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreateRequest}>
              <div className="modal-body">
                <div className="field-group">
                  <label className="field-label">Employee</label>
                  <input className="field-input" value={userName} readOnly style={{ backgroundColor: '#F8FAFC' }} />
                </div>

                <div className="field-group">
                  <label className="field-label">Time Off Type</label>
                  <select
                    className="field-input"
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                  >
                    <option value="Paid Time Off">Paid Time Off (Annual Leave)</option>
                    <option value="Sick Leave">Sick Leave (Emergency)</option>
                    <option value="Comp Off">Comp Off (Overtime Compensatory)</option>
                  </select>
                </div>

                <div className="form-grid-2col">
                  <div className="field-group">
                    <label className="field-label">Start Date</label>
                    <input
                      type="date"
                      className="field-input"
                      value={newStartDate}
                      onChange={(e) => setNewStartDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="field-group">
                    <label className="field-label">End Date</label>
                    <input
                      type="date"
                      className="field-input"
                      value={newEndDate}
                      onChange={(e) => setNewEndDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="field-group">
                  <label className="field-label">Reason / Notes</label>
                  <textarea
                    className="field-input"
                    rows={3}
                    placeholder="Brief description of your leave..."
                    value={newReason}
                    onChange={(e) => setNewReason(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-status-action"
                  onClick={() => setNewModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-action-primary"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
