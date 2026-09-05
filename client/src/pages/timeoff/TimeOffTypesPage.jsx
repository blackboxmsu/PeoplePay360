import React, { useState, useEffect } from 'react';
import { Search, Plus, ArrowLeft, Edit2, Save, X, Settings2 } from 'lucide-react';
import store from '../../services/dataStore';
import { useAuth } from '../../context/AuthContext';

export default function TimeOffTypesPage() {
  const { canManageHR } = useAuth();
  const [types, setTypes] = useState(store.getTimeOffTypes());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form edit / create state
  const [formState, setFormState] = useState({
    id: '',
    name: '',
    unit: 'Days',
    allocation: 'Required',
    approval: 'Manager',
    status: 'Active',
    payrollEntry: 'Leave Work Entry',
    displayColor: 'Green',
    notes: ''
  });

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setTypes([...store.getTimeOffTypes()]);
    });
    return unsub;
  }, []);

  const handleOpenType = (t) => {
    setSelectedType(t);
    setIsEditing(false);
    setFormState({ ...t });
  };

  const handleNewType = () => {
    const newT = {
      id: `tot-${Date.now()}`,
      name: '',
      unit: 'Days',
      allocation: 'Required',
      approval: 'Manager',
      status: 'Active',
      payrollEntry: 'Leave Work Entry',
      displayColor: 'Green',
      notes: ''
    };
    setSelectedType(newT);
    setIsEditing(true);
    setFormState(newT);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formState.name.trim()) return;

    store.saveTimeOffType(formState);
    setSelectedType(formState);
    setIsEditing(false);
  };

  const filtered = types.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.payrollEntry && t.payrollEntry.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // FORM VIEW (Requirement A4: Define leave policies including units, allocation requirements, approval workflows, and payroll integration)
  if (selectedType) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              className="btn-action-primary"
              style={{ backgroundColor: '#FFFFFF', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}
              onClick={() => setSelectedType(null)}
            >
              <ArrowLeft size={16} />
              <span>Time Off Types</span>
            </button>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
              {formState.name || 'New Time Off Type'}
            </span>
          </div>

          {canManageHR && (
            <div style={{ display: 'flex', gap: '8px' }}>
              {isEditing ? (
                <button type="button" className="btn-action-primary" onClick={handleSave}>
                  <Save size={15} />
                  <span>SAVE</span>
                </button>
              ) : (
                <button type="button" className="btn-action-primary" onClick={() => setIsEditing(true)}>
                  <Edit2 size={15} />
                  <span>EDIT</span>
                </button>
              )}
            </div>
          )}
        </div>

        <div className="odoo-form-card">
          <div className="odoo-form-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                  Time Off Type / {formState.name || 'New Configuration'}
                </h2>
                <span className="status-pill active">● {formState.status}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Policy definitions controlling units, balance consumption prerequisites, approval rules, and payroll link
              </p>
            </div>
          </div>

          <div className="form-grid-2col">
            <div className="field-group">
              <label className="field-label">Type Name *</label>
              {isEditing ? (
                <input
                  className="field-input"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="e.g. Paid Time Off"
                  required
                />
              ) : (
                <input className="field-input" value={formState.name} readOnly />
              )}
            </div>

            <div className="field-group">
              <label className="field-label">Unit *</label>
              {isEditing ? (
                <select
                  className="field-input"
                  value={formState.unit}
                  onChange={(e) => setFormState({ ...formState, unit: e.target.value })}
                >
                  <option value="Days">Days</option>
                  <option value="Hours">Hours</option>
                </select>
              ) : (
                <input className="field-input" value={formState.unit} readOnly />
              )}
            </div>

            <div className="field-group">
              <label className="field-label">Requires Allocation? *</label>
              {isEditing ? (
                <select
                  className="field-input"
                  value={formState.allocation}
                  onChange={(e) => setFormState({ ...formState, allocation: e.target.value })}
                >
                  <option value="Required">Required (Must have approved allocation quota)</option>
                  <option value="No">No (Ad-hoc / Unallocated with direct manager approval)</option>
                </select>
              ) : (
                <input className="field-input" value={formState.allocation} readOnly />
              )}
            </div>

            <div className="field-group">
              <label className="field-label">Approval Workflow *</label>
              {isEditing ? (
                <select
                  className="field-input"
                  value={formState.approval}
                  onChange={(e) => setFormState({ ...formState, approval: e.target.value })}
                >
                  <option value="Manager">Manager</option>
                  <option value="Officer">Officer</option>
                  <option value="Two-tier (Manager + HR)">Two-tier (Manager + HR)</option>
                </select>
              ) : (
                <input className="field-input" value={formState.approval} readOnly />
              )}
            </div>

            <div className="field-group">
              <label className="field-label">Payroll Integration / Work Entry *</label>
              {isEditing ? (
                <select
                  className="field-input"
                  value={formState.payrollEntry}
                  onChange={(e) => setFormState({ ...formState, payrollEntry: e.target.value })}
                >
                  <option value="Leave Work Entry">Leave Work Entry (Paid)</option>
                  <option value="Unpaid Leave Work Entry">Unpaid Leave Work Entry (Deduction)</option>
                  <option value="Compensatory Overtime">Compensatory Overtime</option>
                </select>
              ) : (
                <input className="field-input" value={formState.payrollEntry} readOnly />
              )}
            </div>

            <div className="field-group">
              <label className="field-label">Display Color</label>
              {isEditing ? (
                <select
                  className="field-input"
                  value={formState.displayColor}
                  onChange={(e) => setFormState({ ...formState, displayColor: e.target.value })}
                >
                  <option value="Green">Green</option>
                  <option value="Amber">Amber</option>
                  <option value="Blue">Blue</option>
                  <option value="Purple">Purple</option>
                </select>
              ) : (
                <input className="field-input" value={formState.displayColor} readOnly />
              )}
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--bg-green-soft)', border: '1px solid var(--border-green)', borderRadius: 'var(--radius-lg)', padding: '16px', marginTop: '16px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#064E3B', marginBottom: '6px' }}>Policy Notes</h4>
            {isEditing ? (
              <textarea
                rows={2}
                className="field-input"
                value={formState.notes}
                onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                placeholder="e.g. Standard annual leave. Balance comes from approved allocations."
              />
            ) : (
              <p style={{ fontSize: '0.8rem', color: '#047857', margin: 0 }}>{formState.notes || 'No notes defined.'}</p>
            )}
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
          Time Off Types
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Configure leave policies defining units (days/hours), allocation requirements, approval workflows, and payroll integration
        </p>
      </div>

      <div className="odoo-control-bar">
        <div className="control-bar-left">
          {canManageHR && (
            <button type="button" className="btn-action-primary" onClick={handleNewType}>
              <Plus size={16} />
              <span>NEW</span>
            </button>
          )}

          <div className="search-input-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search time off types..."
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
              <th>Type Name</th>
              <th>Unit</th>
              <th>Requires Allocation</th>
              <th>Approval Workflow</th>
              <th>Payroll Work Entry</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr
                key={t.id}
                style={{ cursor: 'pointer' }}
                onClick={() => handleOpenType(t)}
                title="Click to view policy rules"
              >
                <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{t.name}</td>
                <td>{t.unit}</td>
                <td>
                  <span className={`status-pill ${t.allocation === 'Required' ? 'active' : 'draft'}`}>
                    {t.allocation}
                  </span>
                </td>
                <td>{t.approval}</td>
                <td>{t.payrollEntry}</td>
                <td>
                  <span className="status-pill active">● {t.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
