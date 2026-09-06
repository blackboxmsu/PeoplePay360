import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import store from '../../services/dataStore';
import { Search, Plus, ArrowLeft, Check, X, Shield, CalendarPlus, Filter } from 'lucide-react';

export default function TimeOffRequestsPage() {
  const { user, isEmployeeSelf, canManageHR } = useAuth();
  const userName = user?.name || 'Rohan Patel';
  const [searchParams, setSearchParams] = useSearchParams();
  const employeeParam = searchParams.get('employee') || '';

  const [requests, setRequests] = useState(store.getTimeOffRequests());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);

  // New Request Modal state for employee self-service
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [newType, setNewType] = useState('Paid Time Off');
  const [newStartDate, setNewStartDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');
  const [newReason, setNewReason] = useState('');

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setRequests([...store.getTimeOffRequests()]);
    });
    return unsub;
  }, []);

  const handleStatusChange = (id, newStatus) => {
    // Requirement A4: Approved leave requests automatically deduct from assigned allocations
    if (!canManageHR) return;
    store.updateRequestStatus(id, newStatus);
    const updated = store.getTimeOffRequests().find((r) => r.id === id);
    if (updated && selectedRequest && selectedRequest.id === id) {
      setSelectedRequest(updated);
    }
  };

  const handleCreateRequest = (e) => {
    e.preventDefault();
    if (!newStartDate || !newEndDate) return;

    const start = new Date(newStartDate);
    const end = new Date(newEndDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 || 1;

    const newReq = {
      id: `req-${Date.now()}`,
      employeeName: userName,
      employeeId: user?.employeeId || 'emp-self',
      type: newType,
      startDate: newStartDate,
      endDate: newEndDate,
      duration: diffDays,
      status: 'To Approve',
      approver: 'Sara Khan',
      allocationUsed: `${newType} (2026 Annual Balance)`,
      reason: newReason || 'Personal leave request'
    };

    store.saveTimeOffRequest(newReq);
    setNewModalOpen(false);
    setSelectedRequest(newReq);
  };

  // Filter list based on role authorization and query parameters
  const baseList = isEmployeeSelf
    ? (requests || []).filter((r) => {
        const rName = (r.employeeName || '').toLowerCase().trim();
        const uName = (userName || '').toLowerCase().trim();
        const matchId = user?.employeeId && r.employeeId === user.employeeId;
        return matchId || (rName && uName && rName === uName);
      })
    : (employeeParam
        ? (requests || []).filter((r) => (r.employeeName || '').toLowerCase().trim() === employeeParam.toLowerCase().trim())
        : (requests || []));

  const filtered = baseList.filter((r) =>
    (r.employeeName && r.employeeName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (r.type && r.type.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (r.reason && r.reason.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDuration = (d) => {
    if (typeof d === 'number') return `${d} ${d === 1 ? 'Day' : 'Days'}`;
    return d || '1 Day';
  };

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
              <input className="field-input" value={formatDuration(selectedRequest.duration)} readOnly style={{ fontWeight: 700, color: '#059669' }} />
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
              <input className="field-input" value={selectedRequest.approver || 'Sara Khan'} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">End Date</label>
              <input className="field-input" value={selectedRequest.endDate} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Allocation Deducted</label>
              <input className="field-input" value={selectedRequest.allocationUsed || `${selectedRequest.type} (2026 Annual Balance)`} readOnly />
            </div>
          </div>

          <div className="field-group" style={{ marginTop: '12px' }}>
            <label className="field-label">Reason</label>
            <textarea
              className="field-input"
              rows={3}
              value={selectedRequest.reason || 'Personal leave'}
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

      {employeeParam && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          background: '#EFF6FF',
          border: '1px solid #BFDBFE',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.85rem',
          color: '#1E40AF'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={15} />
            <span>Filtered for employee: <strong>{employeeParam}</strong></span>
          </div>
          <button
            type="button"
            onClick={() => setSearchParams({})}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#2563EB',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.8rem',
              textDecoration: 'underline'
            }}
          >
            Clear Filter
          </button>
        </div>
      )}

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
              placeholder="Search by employee, type or reason..."
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
                  <td style={{ fontWeight: 700, color: '#059669' }}>{formatDuration(r.duration)}</td>
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
                  No leave requests found. Click 'New Leave Request' to apply.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* New Leave Request Modal */}
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
                    <option value="Casual Leave">Casual Leave</option>
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
