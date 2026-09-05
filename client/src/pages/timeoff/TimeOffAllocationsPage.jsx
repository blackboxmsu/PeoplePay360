import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Search, Plus, ArrowLeft, Check, X, Shield } from 'lucide-react';

const INITIAL_ALLOCATIONS = [
  {
    id: 'alc-parth-1',
    employeeName: 'Parth Solanki',
    type: 'Paid Time Off',
    allocated: '20 Days',
    taken: '4 Days',
    remaining: '16 Days',
    status: 'Approved',
    validity: '2026 Annual Balance',
    approver: 'Meet Rathod',
    description: 'Engineering department annual leave grant.'
  },
  {
    id: 'alc-parth-2',
    employeeName: 'Parth Solanki',
    type: 'Comp Off',
    allocated: '2 Days',
    taken: '0 Days',
    remaining: '2 Days',
    status: 'Approved',
    validity: 'Q3 Balance',
    approver: 'Meet Rathod',
    description: 'Weekend emergency support comp-off credit.'
  },
  {
    id: 'alc-1',
    employeeName: 'Aarav Mehta',
    type: 'Paid Time Off',
    allocated: '20 Days',
    taken: '8 Days',
    remaining: '12 Days',
    status: 'Approved',
    validity: '2026 Annual Balance',
    approver: 'Meet Rathod',
    description: 'Annual leave balance granted at start of policy year.'
  },
  {
    id: 'alc-2',
    employeeName: 'Meet Rathod',
    type: 'Paid Time Off',
    allocated: '18 Days',
    taken: '4 Days',
    remaining: '14 Days',
    status: 'Approved',
    validity: '2026 Annual Balance',
    approver: 'Raviraj Dhokiya',
    description: 'Executive leave allocation.'
  },
  {
    id: 'alc-3',
    employeeName: 'Neha Patel',
    type: 'Comp Off',
    allocated: '2 Days',
    taken: '1 Day',
    remaining: '1 Day',
    status: 'To Approve',
    validity: 'Q3 Balance',
    approver: 'Meet Rathod',
    description: 'Compensation off for weekend hiring drive.'
  }
];

export default function TimeOffAllocationsPage() {
  const { user, isEmployeeSelf, canManageHR } = useAuth();
  const userName = user?.name || 'Parth Solanki';

  const [allocations, setAllocations] = useState(INITIAL_ALLOCATIONS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAllocation, setSelectedAllocation] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    if (!canManageHR) return;
    setAllocations(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    if (selectedAllocation && selectedAllocation.id === id) {
      setSelectedAllocation(prev => ({ ...prev, status: newStatus }));
    }
  };

  // Strictly filter list if employee role
  const baseList = isEmployeeSelf
    ? allocations.filter(a => a.employeeName.toLowerCase() === userName.toLowerCase())
    : allocations;

  const filtered = baseList.filter(a =>
    a.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Form View (Screenshot 5)
  if (selectedAllocation) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              className="btn-action-primary"
              style={{ backgroundColor: '#FFFFFF', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}
              onClick={() => setSelectedAllocation(null)}
            >
              <ArrowLeft size={16} />
              <span>Allocations</span>
            </button>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
              {selectedAllocation.employeeName}
            </span>
          </div>

          {canManageHR && (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                className="btn-action-primary"
                style={{ backgroundColor: '#059669' }}
                onClick={() => handleStatusChange(selectedAllocation.id, 'Approved')}
                disabled={selectedAllocation.status === 'Approved'}
              >
                <Check size={15} />
                <span>Approve</span>
              </button>
              <button
                type="button"
                className="btn-action-primary"
                style={{ backgroundColor: '#DC2626' }}
                onClick={() => handleStatusChange(selectedAllocation.id, 'Refused')}
                disabled={selectedAllocation.status === 'Refused'}
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
                Allocation / {selectedAllocation.employeeName}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {isEmployeeSelf ? 'Your granted leave balance grant' : 'Form view of one allocation record'}
              </p>
            </div>
            <span className={`status-pill ${selectedAllocation.status === 'Approved' ? 'active' : 'draft'}`}>
              ● {selectedAllocation.status}
            </span>
          </div>

          <div className="form-grid-2col">
            <div className="field-group">
              <label className="field-label">Employee</label>
              <input className="field-input" value={selectedAllocation.employeeName} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Taken</label>
              <input className="field-input" value={selectedAllocation.taken} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Time Off Type</label>
              <input className="field-input" value={selectedAllocation.type} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Remaining</label>
              <input className="field-input" value={selectedAllocation.remaining} readOnly style={{ fontWeight: 700, color: '#059669' }} />
            </div>

            <div className="field-group">
              <label className="field-label">Allocated</label>
              <input className="field-input" value={selectedAllocation.allocated} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Approver</label>
              <input className="field-input" value={selectedAllocation.approver} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Status</label>
              <div>
                <span className={`status-pill ${selectedAllocation.status === 'Approved' ? 'active' : 'draft'}`}>
                  ● {selectedAllocation.status}
                </span>
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Validity</label>
              <input className="field-input" value={selectedAllocation.validity} readOnly />
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--bg-green-soft)', border: '1px solid var(--border-green)', borderRadius: 'var(--radius-lg)', padding: '16px', marginTop: '12px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#064E3B', marginBottom: '6px' }}>Description</h4>
            <p style={{ fontSize: '0.8rem', color: '#047857' }}>{selectedAllocation.description}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          {isEmployeeSelf ? 'My Leave Balances' : 'Allocations'}
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          {isEmployeeSelf
            ? `Available balance quotas and consumed leaves for ${userName}`
            : 'List view opened from Time Off ▼ → Allocations (Allocated, Taken, Remaining math)'
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
              placeholder="Search allocations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isEmployeeSelf && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#059669', fontWeight: 600 }}>
            <Shield size={14} />
            <span>Personal Balance Ledger</span>
          </div>
        )}
      </div>

      <div className="table-panel">
        <table className="odoo-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Type</th>
              <th>Allocated</th>
              <th>Taken</th>
              <th>Remaining</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((a) => (
                <tr
                  key={a.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedAllocation(a)}
                >
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{a.employeeName}</td>
                  <td>{a.type}</td>
                  <td>{a.allocated}</td>
                  <td>{a.taken}</td>
                  <td style={{ fontWeight: 700, color: '#059669' }}>{a.remaining}</td>
                  <td>
                    <span className={`status-pill ${a.status === 'Approved' ? 'active' : 'draft'}`}>
                      ● {a.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
                  No allocations registered for your account.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
