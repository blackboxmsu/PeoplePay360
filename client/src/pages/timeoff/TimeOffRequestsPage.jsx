import React, { useState } from 'react';
import { Search, Plus, ArrowLeft, Check, X, Calendar, Clock, Shield, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const INITIAL_REQUESTS = [
  {
    id: 'req-4',
    employeeName: 'Rohan Patel',
    type: 'Paid Time Off',
    startDate: '22-Sep-2026',
    endDate: '23-Sep-2026',
    duration: '2 Days',
    status: 'To Approve',
    approver: 'Sara Khan',
    allocationUsed: 'Paid Time Off 2026',
    reason: 'Personal family emergency'
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
    reason: 'Weekend release deployment support'
  }
];

export default function TimeOffRequestsPage() {
  const { user, isEmployee, canApproveTimeOff } = useAuth();
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);

  // New Request Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leaveType, setLeaveType] = useState('Paid Time Off');
  const [startDate, setStartDate] = useState('2026-09-25');
  const [endDate, setEndDate] = useState('2026-09-26');
  const [duration, setDuration] = useState('2 Days');
  const [reason, setReason] = useState('');

  const handleStatusChange = (id, newStatus) => {
    if (!canApproveTimeOff) return;
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest(prev => ({ ...prev, status: newStatus }));
    }
  };

  const handleCreateRequest = (e) => {
    e.preventDefault();
    const applicantName = isEmployee ? (user?.name || 'Rohan Patel') : 'Sara Khan';

    const newReq = {
      id: `req-${Date.now()}`,
      employeeName: applicantName,
      type: leaveType,
      startDate,
      endDate,
      duration: duration || '1 Day',
      status: 'To Approve',
      approver: 'Sara Khan',
      allocationUsed: `${leaveType} Balance`,
      reason: reason || 'Personal leave request'
    };

    setRequests([newReq, ...requests]);
    setIsModalOpen(false);
    setSelectedRequest(newReq);
  };

  const filtered = requests.filter(r => {
    if (isEmployee) {
      const currentUserName = (user?.name || 'Rohan Patel').toLowerCase();
      const isSelf = r.employeeName.toLowerCase().includes(currentUserName) ||
                     r.employeeName.toLowerCase().includes('rohan');
      return isSelf && (
        r.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return (
      r.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

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

          {/* Action buttons: Only HR Manager and Approvers can approve/refuse */}
          {canApproveTimeOff ? (
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
          ) : (
            <span className="status-pill draft" style={{ fontSize: '0.75rem' }}>
              Pending HR Manager Approval
            </span>
          )}
        </div>

        <div className="odoo-form-card">
          <div className="odoo-form-header">
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                Time Off Request / {selectedRequest.employeeName}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Form view of one leave request</p>
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
              <label className="field-label">Approver</label>
              <input className="field-input" value={selectedRequest.approver} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">End Date</label>
              <input className="field-input" value={selectedRequest.endDate} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Allocation Used</label>
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
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              {isEmployee ? 'My Leave Requests' : 'Time Off Requests'}
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
              ? 'Submit time off requests and monitor manager approval statuses.'
              : 'Approve, refuse, and monitor employee leave requests across the company.'}
          </p>
        </div>

        {/* Employee Leave Balance Summary Cards */}
        {isEmployee && (
          <div style={{
            display: 'flex',
            gap: '12px',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '8px 16px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Paid Leave</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#059669' }}>12 Days</div>
            </div>
            <div style={{ borderLeft: '1px solid var(--border-subtle)', height: '28px', alignSelf: 'center' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Sick Leave</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#2563EB' }}>4 Days</div>
            </div>
            <div style={{ borderLeft: '1px solid var(--border-subtle)', height: '28px', alignSelf: 'center' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Comp Off</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#7C3AED' }}>2 Days</div>
            </div>
          </div>
        )}
      </div>

      <div className="odoo-control-bar">
        <div className="control-bar-left">
          <button
            type="button"
            className="btn-action-primary"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={16} />
            <span>NEW REQUEST</span>
          </button>

          <div className="search-input-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
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
              <th>Approver / Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                  No leave requests found. Click NEW REQUEST to submit a time off request.
                </td>
              </tr>
            ) : (
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
                  <td onClick={(e) => e.stopPropagation()}>
                    {canApproveTimeOff ? (
                      r.status === 'To Approve' ? (
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
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {r.status === 'Approved' ? 'Approved' : 'Refused'}
                        </span>
                      )
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Approver: {r.approver}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* New Time Off Request Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-dialog" style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={18} style={{ color: '#059669' }} />
                <h3 className="modal-title">Submit Time Off Request</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94A3B8' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateRequest}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="field-group">
                  <label className="field-label">Time Off Type *</label>
                  <select
                    className="field-input"
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value)}
                  >
                    <option value="Paid Time Off">Paid Time Off (Annual)</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Comp Off">Compensatory Off</option>
                    <option value="Unpaid Leave">Unpaid Leave</option>
                  </select>
                </div>

                <div className="form-grid-2col">
                  <div className="field-group">
                    <label className="field-label">Start Date *</label>
                    <input
                      type="date"
                      className="field-input"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="field-group">
                    <label className="field-label">End Date *</label>
                    <input
                      type="date"
                      className="field-input"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="field-group">
                  <label className="field-label">Duration</label>
                  <input
                    type="text"
                    className="field-input"
                    placeholder="e.g. 2 Days, 1 Day"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>

                <div className="field-group">
                  <label className="field-label">Reason</label>
                  <textarea
                    className="field-input"
                    rows={2}
                    placeholder="Brief reason for time off request..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
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
                  <span>Submit Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
