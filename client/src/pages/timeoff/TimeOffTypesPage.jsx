import React, { useState } from 'react';
import { Search, Plus, ArrowLeft, Edit2 } from 'lucide-react';

const INITIAL_TYPES = [
  {
    id: 'tot-1',
    name: 'Paid Time Off',
    unit: 'Days',
    allocation: 'Required',
    approval: 'Manager',
    status: 'Active',
    payrollEntry: 'Leave Work Entry',
    displayColor: 'Green',
    notes: 'Standard annual leave. Balance comes from approved allocations.'
  },
  {
    id: 'tot-2',
    name: 'Sick Leave',
    unit: 'Days',
    allocation: 'No',
    approval: 'Manager',
    status: 'Active',
    payrollEntry: 'Leave Work Entry',
    displayColor: 'Amber',
    notes: 'Unallocated emergency medical leave with direct manager approval.'
  },
  {
    id: 'tot-3',
    name: 'Comp Off',
    unit: 'Hours',
    allocation: 'Required',
    approval: 'Officer',
    status: 'Active',
    payrollEntry: 'Compensatory Overtime',
    displayColor: 'Blue',
    notes: 'Granted for holiday/weekend shift coverage.'
  }
];

export default function TimeOffTypesPage() {
  const [types, setTypes] = useState(INITIAL_TYPES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState(null);

  const filtered = types.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Form View (Screenshot 5)
  if (selectedType) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
              {selectedType.name}
            </span>
          </div>

          <button type="button" className="btn-action-primary">
            <Edit2 size={15} />
            <span>EDIT</span>
          </button>
        </div>

        <div className="odoo-form-card">
          <div className="odoo-form-header">
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                Time Off Type / {selectedType.name}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Form view of one time off type</p>
            </div>
            <span className="status-pill active">● {selectedType.status}</span>
          </div>

          <div className="form-grid-2col">
            <div className="field-group">
              <label className="field-label">Type Name</label>
              <input className="field-input" value={selectedType.name} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Approval</label>
              <input className="field-input" value={selectedType.approval} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Unit</label>
              <input className="field-input" value={selectedType.unit} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Payroll / Work Entry</label>
              <input className="field-input" value={selectedType.payrollEntry} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Requires Allocation</label>
              <input className="field-input" value={selectedType.allocation} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Display Color</label>
              <input className="field-input" value={selectedType.displayColor} readOnly />
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--bg-green-soft)', border: '1px solid var(--border-green)', borderRadius: 'var(--radius-lg)', padding: '16px', marginTop: '12px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#064E3B', marginBottom: '6px' }}>Configuration Notes</h4>
            <p style={{ fontSize: '0.8rem', color: '#047857' }}>{selectedType.notes}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Time Off Types
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          List view opened from Time Off ▼ → Time Off Types (defines policy rules)
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
              <th>Type</th>
              <th>Unit</th>
              <th>Allocation</th>
              <th>Approval</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr
                key={t.id}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedType(t)}
              >
                <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{t.name}</td>
                <td>{t.unit}</td>
                <td>{t.allocation}</td>
                <td>{t.approval}</td>
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
