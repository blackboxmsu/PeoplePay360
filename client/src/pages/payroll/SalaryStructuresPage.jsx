import React, { useState } from 'react';
import { Search, Plus, ArrowLeft, Edit2, Lock, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const INITIAL_STRUCTURES = [
  {
    id: 'str-1',
    name: 'Regular Salary',
    rulesCount: 11,
    employeesCount: 42,
    active: true,
    rules: [
      { sequence: 1, name: 'Basic Salary', code: 'BASIC', category: 'Basic' },
      { sequence: 10, name: 'House Rent Allowance', code: 'HRA', category: 'Allowance' },
      { sequence: 20, name: 'Standard Allowance', code: 'STD', category: 'Allowance' },
      { sequence: 30, name: 'Performance Bonus', code: 'BONUS', category: 'Allowance' },
      { sequence: 40, name: 'Leave Travel Allowance', code: 'LTA', category: 'Allowance' },
      { sequence: 60, name: 'Gross Salary', code: 'GROSS', category: 'Gross' },
      { sequence: 70, name: 'Labor Welfare Fund', code: 'LWF', category: 'Deduction' },
      { sequence: 80, name: 'Provident Fund', code: 'PF', category: 'Deduction' },
      { sequence: 90, name: 'ESI Contribution', code: 'ESI', category: 'Deduction' },
      { sequence: 100, name: 'Professional Tax', code: 'PT', category: 'Deduction' },
      { sequence: 110, name: 'Net Salary', code: 'NET', category: 'Net' }
    ]
  },
  {
    id: 'str-2',
    name: 'Intern Salary',
    rulesCount: 4,
    employeesCount: 6,
    active: true,
    rules: [
      { sequence: 1, name: 'Stipend Base', code: 'STIPEND', category: 'Basic' },
      { sequence: 10, name: 'Travel Conveyance', code: 'CONV', category: 'Allowance' },
      { sequence: 20, name: 'Gross Stipend', code: 'GROSS', category: 'Gross' },
      { sequence: 30, name: 'Net Stipend', code: 'NET', category: 'Net' }
    ]
  },
  {
    id: 'str-3',
    name: 'Contractor Fixed',
    rulesCount: 3,
    employeesCount: 4,
    active: true,
    rules: [
      { sequence: 1, name: 'Fixed Retainer', code: 'RETAINER', category: 'Basic' },
      { sequence: 10, name: 'TDS Deduction (10%)', code: 'TDS', category: 'Deduction' },
      { sequence: 20, name: 'Net Payout', code: 'NET', category: 'Net' }
    ]
  }
];

export default function SalaryStructuresPage() {
  const { canEditPayrollStructures, isStructuresReadOnly } = useAuth();
  const [structures, setStructures] = useState(INITIAL_STRUCTURES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStructure, setSelectedStructure] = useState(null);

  const filtered = structures.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Form View (Screenshot 7)
  if (selectedStructure) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              className="btn-action-primary"
              style={{ backgroundColor: '#FFFFFF', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}
              onClick={() => setSelectedStructure(null)}
            >
              <ArrowLeft size={16} />
              <span>Structures</span>
            </button>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
              Salary Structure / {selectedStructure.name}
            </span>
          </div>

          {canEditPayrollStructures ? (
            <button type="button" className="btn-action-primary">
              <Edit2 size={15} />
              <span>EDIT</span>
            </button>
          ) : (
            <span className="status-pill draft" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
              <Lock size={12} />
              <span>Read-Only Mode (HR Payroll User)</span>
            </span>
          )}
        </div>

        <div className="odoo-form-card">
          <div className="odoo-form-header">
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                Salary Structure / {selectedStructure.name}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Form view with its attached salary rules</p>
            </div>
            <span className="status-pill active">● Active</span>
          </div>

          <div className="form-grid-2col">
            <div className="field-group">
              <label className="field-label">Structure Name</label>
              <input className="field-input" value={selectedStructure.name} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Active</label>
              <input className="field-input" value="True" readOnly />
            </div>
          </div>

          {/* Sub-table: Salary Rules (Screenshot 7) */}
          <div style={{ marginTop: '14px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>
              Salary Rules
            </h4>
            <div className="table-panel">
              <table className="odoo-table" style={{ fontSize: '0.825rem' }}>
                <thead>
                  <tr>
                    <th style={{ width: '90px' }}>Sequence</th>
                    <th>Rule Name</th>
                    <th>Code</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedStructure.rules.map((rule) => (
                    <tr key={rule.code}>
                      <td style={{ fontWeight: 700, color: '#059669' }}>{rule.sequence}</td>
                      <td style={{ fontWeight: 600 }}>{rule.name}</td>
                      <td style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-muted)' }}>{rule.code}</td>
                      <td>
                        <span
                          className="status-pill"
                          style={{
                            fontSize: '0.72rem',
                            backgroundColor:
                              rule.category === 'Basic' ? '#EFF6FF' :
                              rule.category === 'Allowance' ? '#ECFDF5' :
                              rule.category === 'Deduction' ? '#FEF2F2' : '#F1F5F9',
                            color:
                              rule.category === 'Basic' ? '#1D4ED8' :
                              rule.category === 'Allowance' ? '#047857' :
                              rule.category === 'Deduction' ? '#B91C1C' : '#0F172A'
                          }}
                        >
                          {rule.category}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Salary Structures
          </h1>
          {isStructuresReadOnly && (
            <span className="status-pill draft" style={{ fontSize: '0.75rem' }}>
              <Lock size={12} />
              <span>Read-Only Mode</span>
            </span>
          )}
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Structures group salary rules; rules define the ordered salary computation used by a payslip
        </p>
      </div>

      {isStructuresReadOnly && (
        <div style={{
          backgroundColor: '#FFFBEB',
          border: '1px solid #FDE68A',
          color: '#92400E',
          borderRadius: 'var(--radius-md)',
          padding: '10px 14px',
          fontSize: '0.825rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Lock size={15} style={{ flexShrink: 0 }} />
          <span>
            <strong>Role Scope Notice:</strong> As an <strong>HR Payroll User</strong>, you have Read-Only access to Salary Structures and Salary Rules. Full CRUD configurations require an <strong>HR Payroll Manager</strong> or <strong>Admin</strong>.
          </span>
        </div>
      )}

      <div className="odoo-control-bar">
        <div className="control-bar-left">
          {canEditPayrollStructures ? (
            <button type="button" className="btn-action-primary">
              <Plus size={16} />
              <span>NEW</span>
            </button>
          ) : (
            <button
              type="button"
              className="btn-action-primary"
              disabled
              style={{ opacity: 0.5, cursor: 'not-allowed' }}
              title="Read-only access for HR Payroll User"
            >
              <Lock size={14} />
              <span>NEW (Locked)</span>
            </button>
          )}

          <div className="search-input-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search structures..."
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
              <th>Structure Name</th>
              <th>Rules</th>
              <th>Employees</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr
                key={s.id}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedStructure(s)}
              >
                <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{s.name}</td>
                <td>{s.rulesCount} rules</td>
                <td>{s.employeesCount} employees</td>
                <td>
                  <span className="status-pill active">● Active</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
