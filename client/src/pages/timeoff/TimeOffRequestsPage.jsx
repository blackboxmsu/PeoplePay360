import React, { useState } from 'react';
import { Search, Plus, ArrowLeft, Check, X } from 'lucide-react';

const INITIAL_REQUESTS = [
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
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest(prev => ({ ...prev, status: newStatus }));
    }
  };

  const filtered = requests.filter(r =>
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
      <div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Time Off Requests
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          List view opened from Time Off ▼ → Requests
        </p>
      </div>

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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
