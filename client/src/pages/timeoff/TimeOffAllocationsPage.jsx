import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Plus, ArrowLeft, Check, X, Shield, Clock, AlertTriangle, Save, Calendar } from 'lucide-react';
import store from '../../services/dataStore';
import { useAuth } from '../../context/AuthContext';

export default function TimeOffAllocationsPage() {
  const { canManageHR } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const employeeFilter = searchParams.get('employee') || '';

  const [allocations, setAllocations] = useState(store.getAllocations());
  const [employees, setEmployees] = useState(store.getEmployees());
  const [timeOffTypes, setTimeOffTypes] = useState(store.getTimeOffTypes());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAllocation, setSelectedAllocation] = useState(null);

  // New Allocation Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalEmployee, setModalEmployee] = useState('');
  const [modalType, setModalType] = useState('Paid Time Off');
  const [modalDays, setModalDays] = useState(20);
  const [modalValidity, setModalValidity] = useState('2026 Annual Balance');
  const [modalDesc, setModalDesc] = useState('');

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setAllocations([...store.getAllocations()]);
      setEmployees([...store.getEmployees()]);
      setTimeOffTypes([...store.getTimeOffTypes()]);
    });
    return unsub;
  }, []);

  const handleStatusChange = (id, newStatus) => {
    if (!canManageHR) return;
    const current = store.getAllocations().find((a) => a.id === id);
    if (current) {
      store.saveAllocation({ ...current, status: newStatus });
      if (selectedAllocation && selectedAllocation.id === id) {
        setSelectedAllocation({ ...current, status: newStatus });
      }
    }
  };

  const handleCreateAllocation = (e) => {
    e.preventDefault();
    const emp = employees.find((emp) => emp.name === modalEmployee) || employees[0];
    const newAlc = {
      id: `alc-${Date.now()}`,
      employeeId: emp?.id || 'emp-1',
      employeeName: emp?.name || 'Aarav Mehta',
      type: modalType,
      allocated: Number(modalDays) || 1,
      taken: 0,
      remaining: Number(modalDays) || 1,
      unit: 'Days',
      status: 'To Approve', // Requiring approval before availability
      validity: modalValidity || '2026 Annual Balance',
      approver: 'Sara Khan',
      description: modalDesc || 'Annual leave allocation granted under HR policy.',
      deductionLog: []
    };

    store.saveAllocation(newAlc);
    setIsModalOpen(false);
    setSelectedAllocation(newAlc);
  };

  const filtered = allocations.filter((a) => {
    const matchesSearch =
      a.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.validity && a.validity.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesEmployee = employeeFilter
      ? a.employeeName.toLowerCase() === employeeFilter.toLowerCase() ||
        (a.employeeId && a.employeeId === employeeFilter)
      : true;

    return matchesSearch && matchesEmployee;
  });

  // FORM VIEW (Requirement A4: Track taken, remaining, validity, approval requirement, and transparent consumption links)
  if (selectedAllocation) {
    const isApproved = selectedAllocation.status === 'Approved';
    const deductionHistory = selectedAllocation.deductionLog || [];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
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
              {selectedAllocation.employeeName} ({selectedAllocation.type})
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
                <span>Approve Balance</span>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                  Allocation / {selectedAllocation.employeeName}
                </h2>
                <span className={`status-pill ${isApproved ? 'active' : 'draft'}`}>
                  ● {selectedAllocation.status}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                {isApproved
                  ? 'Active allocation balance available for automatic leave request consumption.'
                  : 'Pending approval. Balance cannot be consumed by leave requests until approved.'}
              </p>
            </div>

            {/* Remaining Balance Callout */}
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Remaining Available Balance
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: isApproved ? '#059669' : '#D97706' }}>
                {selectedAllocation.remaining} <span style={{ fontSize: '0.9rem' }}>{selectedAllocation.unit || 'Days'}</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {selectedAllocation.taken} Taken / {selectedAllocation.allocated} Allocated
              </div>
            </div>
          </div>

          <div className="form-grid-2col">
            <div className="field-group">
              <label className="field-label">Employee</label>
              <input className="field-input" value={selectedAllocation.employeeName} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Time Off Type</label>
              <input className="field-input" value={selectedAllocation.type} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Allocated Quota</label>
              <input className="field-input" value={`${selectedAllocation.allocated} ${selectedAllocation.unit || 'Days'}`} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Taken (Consumed by Approved Requests)</label>
              <input className="field-input" value={`${selectedAllocation.taken} ${selectedAllocation.unit || 'Days'}`} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Remaining Balance (Allocated - Taken)</label>
              <input
                className="field-input"
                value={`${selectedAllocation.remaining} ${selectedAllocation.unit || 'Days'}`}
                readOnly
                style={{ fontWeight: 800, color: isApproved ? '#059669' : '#D97706' }}
              />
            </div>

            <div className="field-group">
              <label className="field-label">Validity Period</label>
              <input className="field-input" value={selectedAllocation.validity} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Approver</label>
              <input className="field-input" value={selectedAllocation.approver || 'Sara Khan'} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Availability Status</label>
              <div>
                <span className={`status-pill ${isApproved ? 'active' : 'draft'}`}>
                  ● {isApproved ? 'Available for Deduction' : 'Awaiting Approval (Unavailable)'}
                </span>
              </div>
            </div>
          </div>

          {/* Consumption History Area (Requirement A4: Transparently linked to approved leave requests) */}
          <div style={{ marginTop: '24px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
              Consumption History & Linked Leave Requests
            </h4>
            <div className="table-panel">
              <table className="odoo-table" style={{ fontSize: '0.85rem' }}>
                <thead>
                  <tr>
                    <th>Linked Request ID</th>
                    <th>Deducted Duration</th>
                    <th>Date</th>
                    <th>Reason / Notes</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {deductionHistory.length > 0 ? (
                    deductionHistory.map((item, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{item.requestId}</td>
                        <td style={{ fontWeight: 700, color: '#DC2626' }}>
                          -{item.duration} {selectedAllocation.unit || 'Days'}
                        </td>
                        <td>{item.date}</td>
                        <td>{item.note}</td>
                        <td>
                          <span className="status-pill active" style={{ fontSize: '0.72rem' }}>
                            ● Deducted
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '16px' }}>
                        No leave requests have deducted from this allocation yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--bg-green-soft)', border: '1px solid var(--border-green)', borderRadius: 'var(--radius-lg)', padding: '14px', marginTop: '16px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#064E3B', marginBottom: '4px' }}>Description / Policy Note</h4>
            <p style={{ fontSize: '0.8rem', color: '#047857', margin: 0 }}>{selectedAllocation.description}</p>
          </div>
        </div>
      </div>
    );
  }

  // LIST VIEW
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
          Allocations
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Manage employee leave quotas, require approval before availability, and monitor live taken/remaining metrics
        </p>
      </div>

      {/* Active Employee Filter Tag */}
      {employeeFilter && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', padding: '8px 14px', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: '#1E40AF' }}>
          <span>Filtered by Employee: <strong>{employeeFilter}</strong></span>
          <button
            type="button"
            className="btn-icon"
            style={{ width: '20px', height: '20px', padding: 0 }}
            onClick={() => setSearchParams({})}
            title="Clear filter"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <div className="odoo-control-bar">
        <div className="control-bar-left">
          {canManageHR && (
            <button
              type="button"
              className="btn-action-primary"
              onClick={() => {
                setModalEmployee(employees[0]?.name || '');
                setIsModalOpen(true);
              }}
            >
              <Plus size={16} />
              <span>NEW ALLOCATION</span>
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
      </div>

      <div className="table-panel">
        <table className="odoo-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Time Off Type</th>
              <th>Allocated</th>
              <th>Taken</th>
              <th>Remaining</th>
              <th>Validity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => {
              const isApproved = a.status === 'Approved';
              return (
                <tr
                  key={a.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedAllocation(a)}
                  title="Click to view allocation and consumption history"
                >
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{a.employeeName}</td>
                  <td>{a.type}</td>
                  <td>{a.allocated} {a.unit || 'Days'}</td>
                  <td style={{ color: '#DC2626', fontWeight: 600 }}>{a.taken} {a.unit || 'Days'}</td>
                  <td style={{ fontWeight: 800, color: isApproved ? '#059669' : '#D97706' }}>
                    {a.remaining} {a.unit || 'Days'}
                  </td>
                  <td>{a.validity}</td>
                  <td>
                    <span className={`status-pill ${isApproved ? 'active' : 'draft'}`}>
                      ● {a.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* NEW ALLOCATION MODAL */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '520px', width: '90%' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>Create Time Off Allocation</h3>
              <button type="button" className="btn-icon" onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateAllocation}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '20px' }}>
                <div className="field-group">
                  <label className="field-label">Employee *</label>
                  <select
                    className="field-input"
                    value={modalEmployee}
                    onChange={(e) => setModalEmployee(e.target.value)}
                    required
                  >
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.name}>
                        {emp.name} ({emp.department})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field-group">
                  <label className="field-label">Time Off Type *</label>
                  <select
                    className="field-input"
                    value={modalType}
                    onChange={(e) => setModalType(e.target.value)}
                  >
                    {timeOffTypes.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name} ({t.unit})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field-group">
                  <label className="field-label">Allocated Quota (Days / Hours) *</label>
                  <input
                    type="number"
                    min="1"
                    className="field-input"
                    value={modalDays}
                    onChange={(e) => setModalDays(e.target.value)}
                    required
                  />
                </div>

                <div className="field-group">
                  <label className="field-label">Validity Period</label>
                  <input
                    className="field-input"
                    value={modalValidity}
                    onChange={(e) => setModalValidity(e.target.value)}
                    placeholder="e.g. 2026 Annual Balance or Q4 2026"
                  />
                </div>

                <div className="field-group">
                  <label className="field-label">Description / Policy Note</label>
                  <textarea
                    rows={2}
                    className="field-input"
                    value={modalDesc}
                    onChange={(e) => setModalDesc(e.target.value)}
                    placeholder="e.g. Annual leave entitlement granted at start of calendar year."
                  />
                </div>
              </div>

              <div className="modal-footer" style={{ padding: '14px 20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  className="btn-action-primary"
                  style={{ backgroundColor: '#FFFFFF', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-action-primary">
                  <Save size={15} />
                  <span>Create Allocation</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
