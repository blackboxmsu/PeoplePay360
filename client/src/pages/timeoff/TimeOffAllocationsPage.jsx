import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import store from '../../services/dataStore';
import { Search, Plus, ArrowLeft, Check, X, Shield, Filter } from 'lucide-react';

export default function TimeOffAllocationsPage() {
  const { user, isEmployeeSelf, canManageHR } = useAuth();
  const userName = user?.name || 'Rohan Patel';
  const [searchParams, setSearchParams] = useSearchParams();
  const employeeParam = searchParams.get('employee') || '';

  const [allocations, setAllocations] = useState(store.getAllocations());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAllocation, setSelectedAllocation] = useState(null);

  // New Allocation Modal
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [newEmpName, setNewEmpName] = useState('Aarav Mehta');
  const [newType, setNewType] = useState('Paid Time Off');
  const [newAllocated, setNewAllocated] = useState(20);
  const [newValidity, setNewValidity] = useState('2026 Annual Balance');
  const [newDescription, setNewDescription] = useState('Annual leave balance granted at start of policy year.');

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setAllocations([...store.getAllocations()]);
    });
    return unsub;
  }, []);

  const handleStatusChange = (id, newStatus) => {
    if (!canManageHR) return;
    const target = allocations.find((a) => a.id === id);
    if (target) {
      const updated = { ...target, status: newStatus };
      store.saveAllocation(updated);
      if (selectedAllocation && selectedAllocation.id === id) {
        setSelectedAllocation(updated);
      }
    }
  };

  const handleCreateAllocation = (e) => {
    e.preventDefault();
    const newAlc = {
      id: `alc-${Date.now()}`,
      employeeName: newEmpName,
      type: newType,
      allocated: Number(newAllocated),
      taken: 0,
      remaining: Number(newAllocated),
      unit: 'Days',
      status: 'Approved',
      validity: newValidity,
      approver: userName,
      description: newDescription,
      deductionLog: []
    };

    store.saveAllocation(newAlc);
    setIsNewModalOpen(false);
    setSelectedAllocation(newAlc);
  };

  const formatDays = (val) => {
    if (typeof val === 'number') return `${val} Days`;
    return String(val).includes('Day') ? val : `${val} Days`;
  };

  // Strictly filter list if employee role
  const baseList = isEmployeeSelf
    ? (allocations || []).filter((a) => {
        const aName = (a.employeeName || '').toLowerCase().trim();
        const uName = (userName || '').toLowerCase().trim();
        const matchId = user?.employeeId && a.employeeId === user.employeeId;
        return matchId || (aName && uName && aName === uName);
      })
    : (employeeParam
        ? (allocations || []).filter((a) => (a.employeeName || '').toLowerCase().trim() === employeeParam.toLowerCase().trim())
        : (allocations || []));

  const filtered = baseList.filter((a) =>
    (a.employeeName && a.employeeName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (a.type && a.type.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (a.validity && a.validity.toLowerCase().includes(searchTerm.toLowerCase()))
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
              <input className="field-input" value={formatDays(selectedAllocation.taken)} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Time Off Type</label>
              <input className="field-input" value={selectedAllocation.type} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Remaining</label>
              <input className="field-input" value={formatDays(selectedAllocation.remaining)} readOnly style={{ fontWeight: 700, color: '#059669' }} />
            </div>

            <div className="field-group">
              <label className="field-label">Allocated</label>
              <input className="field-input" value={formatDays(selectedAllocation.allocated)} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Approver</label>
              <input className="field-input" value={selectedAllocation.approver || 'Sara Khan'} readOnly />
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
            <p style={{ fontSize: '0.8rem', color: '#047857' }}>{selectedAllocation.description || 'Annual leave quota allocation.'}</p>
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
          {canManageHR && (
            <button
              type="button"
              className="btn-action-primary"
              onClick={() => setIsNewModalOpen(true)}
            >
              <Plus size={16} />
              <span>NEW ALLOCATION</span>
            </button>
          )}

          <div className="search-input-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search allocations by employee or type..."
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
                  <td>{formatDays(a.allocated)}</td>
                  <td>{formatDays(a.taken)}</td>
                  <td style={{ fontWeight: 700, color: '#059669' }}>{formatDays(a.remaining)}</td>
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
                  No allocations found. Click 'NEW ALLOCATION' to add one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* New Allocation Modal */}
      {isNewModalOpen && (
        <div className="modal-overlay">
          <div className="modal-dialog" style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Grant Leave Allocation</h3>
              <button
                type="button"
                onClick={() => setIsNewModalOpen(false)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94A3B8' }}
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreateAllocation}>
              <div className="modal-body">
                <div className="field-group">
                  <label className="field-label">Employee</label>
                  <select
                    className="field-input"
                    value={newEmpName}
                    onChange={(e) => setNewEmpName(e.target.value)}
                    required
                  >
                    {store.getEmployees().map((emp) => (
                      <option key={emp.id} value={emp.name}>
                        {emp.name} ({emp.department})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field-group">
                  <label className="field-label">Time Off Type</label>
                  <select
                    className="field-input"
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                  >
                    <option value="Paid Time Off">Paid Time Off</option>
                    <option value="Comp Off">Comp Off</option>
                    <option value="Casual Leave">Casual Leave</option>
                  </select>
                </div>

                <div className="form-grid-2col">
                  <div className="field-group">
                    <label className="field-label">Allocated Quota (Days)</label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      className="field-input"
                      value={newAllocated}
                      onChange={(e) => setNewAllocated(e.target.value)}
                      required
                    />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Validity Period</label>
                    <input
                      type="text"
                      className="field-input"
                      value={newValidity}
                      onChange={(e) => setNewValidity(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="field-group">
                  <label className="field-label">Description / Policy Note</label>
                  <textarea
                    className="field-input"
                    rows={3}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-status-action"
                  onClick={() => setIsNewModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-action-primary"
                >
                  Grant Allocation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
