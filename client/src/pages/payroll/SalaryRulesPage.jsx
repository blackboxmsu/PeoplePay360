import React, { useState } from 'react';
import { Search, Plus, ArrowLeft, Edit2 } from 'lucide-react';

const INITIAL_RULES = [
  {
    id: 'rule-1',
    name: 'Basic Salary',
    code: 'BASIC',
    category: 'Basic',
    structure: 'Regular Salary',
    sequence: 1,
    computation: 'Percentage of Wage',
    percentage: '50%',
    quantity: '1',
    fixedAmount: '—',
    formula: 'contract.wage * 0.50'
  },
  {
    id: 'rule-2',
    name: 'House Rent Allowance',
    code: 'HRA',
    category: 'Allowance',
    structure: 'Regular Salary',
    sequence: 10,
    computation: 'Percentage of Wage',
    percentage: '40% of BASIC',
    quantity: '1',
    fixedAmount: '—',
    formula: 'BASIC * 0.40'
  },
  {
    id: 'rule-3',
    name: 'Standard Allowance',
    code: 'STD',
    category: 'Allowance',
    structure: 'Regular Salary',
    sequence: 20,
    computation: 'Fixed Amount',
    percentage: '—',
    quantity: '1',
    fixedAmount: '₹10,000',
    formula: '10000'
  },
  {
    id: 'rule-4',
    name: 'Gross Salary',
    code: 'GROSS',
    category: 'Gross',
    structure: 'Regular Salary',
    sequence: 60,
    computation: 'Formula',
    percentage: '—',
    quantity: '1',
    fixedAmount: '—',
    formula: 'BASIC + HRA + STD'
  },
  {
    id: 'rule-5',
    name: 'Provident Fund',
    code: 'PF',
    category: 'Deduction',
    structure: 'Regular Salary',
    sequence: 80,
    computation: 'Percentage of Wage',
    percentage: '12% of BASIC',
    quantity: '1',
    fixedAmount: '—',
    formula: 'BASIC * 0.12'
  },
  {
    id: 'rule-6',
    name: 'Professional Tax',
    code: 'PT',
    category: 'Deduction',
    structure: 'Regular Salary',
    sequence: 100,
    computation: 'Fixed Amount',
    percentage: '—',
    quantity: '1',
    fixedAmount: '₹3,000',
    formula: '3000'
  },
  {
    id: 'rule-7',
    name: 'Net Salary',
    code: 'NET',
    category: 'Net',
    structure: 'Regular Salary',
    sequence: 110,
    computation: 'Formula',
    percentage: '—',
    quantity: '1',
    fixedAmount: '—',
    formula: 'GROSS - PF - PT'
  }
];

export default function SalaryRulesPage() {
  const [rules, setRules] = useState(INITIAL_RULES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRule, setSelectedRule] = useState(null);

  const filtered = rules.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Form View (Screenshot 7)
  if (selectedRule) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              className="btn-action-primary"
              style={{ backgroundColor: '#FFFFFF', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}
              onClick={() => setSelectedRule(null)}
            >
              <ArrowLeft size={16} />
              <span>Salary Rules</span>
            </button>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
              Salary Rule / {selectedRule.name}
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
                Salary Rule / {selectedRule.name}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Form view of one computation rule</p>
            </div>
            <span className="status-pill active">Sequence: {selectedRule.sequence}</span>
          </div>

          <div className="form-grid-2col">
            <div className="field-group">
              <label className="field-label">Rule Name</label>
              <input className="field-input" value={selectedRule.name} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Salary Structure</label>
              <input className="field-input" value={selectedRule.structure} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Code</label>
              <input className="field-input" value={selectedRule.code} readOnly style={{ fontFamily: 'JetBrains Mono, monospace' }} />
            </div>

            <div className="field-group">
              <label className="field-label">Computation Type</label>
              <input className="field-input" value={selectedRule.computation} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Category</label>
              <input className="field-input" value={selectedRule.category} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Percentage / Formula</label>
              <input className="field-input" value={selectedRule.formula} readOnly style={{ fontFamily: 'JetBrains Mono, monospace', color: '#059669', fontWeight: 700 }} />
            </div>

            <div className="field-group">
              <label className="field-label">Sequence</label>
              <input className="field-input" value={selectedRule.sequence} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Quantity</label>
              <input className="field-input" value={selectedRule.quantity} readOnly />
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--bg-green-soft)', border: '1px solid var(--border-green)', borderRadius: 'var(--radius-lg)', padding: '16px', marginTop: '12px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#064E3B', marginBottom: '6px' }}>Computation Options from Specification</h4>
            <p style={{ fontSize: '0.8rem', color: '#047857' }}>
              • <strong>Fixed Amount:</strong> uses the exact value entered.<br />
              • <strong>Percentage:</strong> calculates rule as a % of selected base (e.g., 50% of Contract Wage).<br />
              • <strong>Formula:</strong> evaluates structured arithmetic expressions across previous codes (e.g., <code>GROSS - PF - PT</code>).
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Salary Rules
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          List view exposes name, code, category, structure, and sequence needed to evaluate payroll in order
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
              placeholder="Search salary rules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <span className="status-pill active" style={{ fontSize: '0.75rem' }}>
            Regular Salary
          </span>
        </div>
      </div>

      <div className="table-panel">
        <table className="odoo-table">
          <thead>
            <tr>
              <th style={{ width: '90px' }}>Sequence</th>
              <th>Rule Name</th>
              <th>Code</th>
              <th>Category</th>
              <th>Structure</th>
              <th>Computation</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr
                key={r.id}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedRule(r)}
              >
                <td style={{ fontWeight: 700, color: '#059669' }}>{r.sequence}</td>
                <td style={{ fontWeight: 600 }}>{r.name}</td>
                <td style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-muted)' }}>{r.code}</td>
                <td>
                  <span
                    className="status-pill"
                    style={{
                      fontSize: '0.72rem',
                      backgroundColor:
                        r.category === 'Basic' ? '#EFF6FF' :
                        r.category === 'Allowance' ? '#ECFDF5' :
                        r.category === 'Deduction' ? '#FEF2F2' : '#F1F5F9',
                      color:
                        r.category === 'Basic' ? '#1D4ED8' :
                        r.category === 'Allowance' ? '#047857' :
                        r.category === 'Deduction' ? '#B91C1C' : '#0F172A'
                    }}
                  >
                    {r.category}
                  </span>
                </td>
                <td>{r.structure}</td>
                <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{r.computation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
