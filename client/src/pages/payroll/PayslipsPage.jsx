import React, { useState } from 'react';
import { Search, ArrowLeft, Printer, CheckCircle, AlertTriangle, Download } from 'lucide-react';

const INITIAL_PAYSLIPS = [
  {
    id: 'ps-1',
    employeeName: 'Aarav Mehta',
    warning: '—',
    payrunName: 'February 2026',
    period: '01-Feb — 28-Feb',
    structure: 'Regular Salary',
    status: 'Paid',
    workedDays: 22,
    basic: '₹50,000',
    gross: '₹80,000',
    net: '₹75,000',
    lines: [
      { rule: 'Basic Salary', category: 'Basic', amount: '₹50,000', code: 'BASIC' },
      { rule: 'House Rent Allowance', category: 'Allowance', amount: '₹20,000', code: 'HRA' },
      { rule: 'Standard Allowance', category: 'Allowance', amount: '₹10,000', code: 'STD' },
      { rule: 'Gross Salary', category: 'Gross', amount: '₹80,000', code: 'GROSS' },
      { rule: 'Provident Fund', category: 'Deduction', amount: '-₹2,000', code: 'PF' },
      { rule: 'Professional Tax', category: 'Deduction', amount: '-₹3,000', code: 'PT' },
      { rule: 'Net Salary', category: 'Net', amount: '₹75,000', code: 'NET' }
    ]
  },
  {
    id: 'ps-2',
    employeeName: 'Sara Khan',
    warning: 'A/C missing',
    payrunName: 'February 2026',
    period: '01-Feb — 28-Feb',
    structure: 'Regular Salary',
    status: 'Paid',
    workedDays: 22,
    basic: '₹60,000',
    gross: '₹95,000',
    net: '₹88,000',
    lines: [
      { rule: 'Basic Salary', category: 'Basic', amount: '₹60,000', code: 'BASIC' },
      { rule: 'House Rent Allowance', category: 'Allowance', amount: '₹24,000', code: 'HRA' },
      { rule: 'Standard Allowance', category: 'Allowance', amount: '₹11,000', code: 'STD' },
      { rule: 'Gross Salary', category: 'Gross', amount: '₹95,000', code: 'GROSS' },
      { rule: 'Provident Fund', category: 'Deduction', amount: '-₹3,500', code: 'PF' },
      { rule: 'Professional Tax', category: 'Deduction', amount: '-₹3,500', code: 'PT' },
      { rule: 'Net Salary', category: 'Net', amount: '₹88,000', code: 'NET' }
    ]
  },
  {
    id: 'ps-3',
    employeeName: 'John Dsouza',
    warning: 'Duplicate',
    payrunName: 'February 2026',
    period: '01-Feb — 28-Feb',
    structure: 'Regular Salary',
    status: 'Draft',
    workedDays: 21,
    basic: '₹45,000',
    gross: '₹72,000',
    net: '₹66,000',
    lines: [
      { rule: 'Basic Salary', category: 'Basic', amount: '₹45,000', code: 'BASIC' },
      { rule: 'House Rent Allowance', category: 'Allowance', amount: '₹18,000', code: 'HRA' },
      { rule: 'Standard Allowance', category: 'Allowance', amount: '₹9,000', code: 'STD' },
      { rule: 'Gross Salary', category: 'Gross', amount: '₹72,000', code: 'GROSS' },
      { rule: 'Provident Fund', category: 'Deduction', amount: '-₹3,000', code: 'PF' },
      { rule: 'Professional Tax', category: 'Deduction', amount: '-₹3,000', code: 'PT' },
      { rule: 'Net Salary', category: 'Net', amount: '₹66,000', code: 'NET' }
    ]
  }
];

export default function PayslipsPage() {
  const [payslips, setPayslips] = useState(INITIAL_PAYSLIPS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayslip, setSelectedPayslip] = useState(null);

  const filtered = payslips.filter(p =>
    p.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.payrunName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Form View (Screenshot 6)
  if (selectedPayslip) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              className="btn-action-primary"
              style={{ backgroundColor: '#FFFFFF', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}
              onClick={() => setSelectedPayslip(null)}
            >
              <ArrowLeft size={16} />
              <span>Payslips</span>
            </button>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
              Payslip / {selectedPayslip.employeeName} / {selectedPayslip.payrunName}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              className="btn-action-primary"
              onClick={() => window.print()}
            >
              <Printer size={15} />
              <span>PRINT PAYSLIP</span>
            </button>
          </div>
        </div>

        {/* Action Bar */}
        <div className="action-buttons-bar">
          <button type="button" className="btn-status-action primary-flow">
            COMPUTE
          </button>
          <button type="button" className="btn-status-action">
            MARK PAID
          </button>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Status:</span>
            <span className="status-pill active">● {selectedPayslip.status}</span>
          </div>
        </div>

        {/* Info Card */}
        <div className="odoo-form-card" style={{ padding: '20px' }}>
          <div className="form-grid-2col">
            <div className="field-group">
              <label className="field-label">Employee</label>
              <input className="field-input" value={selectedPayslip.employeeName} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Period</label>
              <input className="field-input" value={selectedPayslip.period} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Salary Structure</label>
              <input className="field-input" value={selectedPayslip.structure} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Status</label>
              <div>
                <span className="status-pill active">● {selectedPayslip.status}</span>
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Pay Run</label>
              <input className="field-input" value={selectedPayslip.payrunName} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Worked Days</label>
              <input className="field-input" value={`${selectedPayslip.workedDays} Days`} readOnly />
            </div>
          </div>
        </div>

        {/* Salary Computation Breakdown Table (Screenshot 6) */}
        <div style={{ marginTop: '8px' }}>
          <div style={{ marginBottom: '8px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Salary Computation
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Rule-by-rule evaluation executed by the sequenced payroll engine
            </span>
          </div>

          <div className="table-panel">
            <table className="odoo-table">
              <thead>
                <tr>
                  <th>Rule</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Code</th>
                </tr>
              </thead>
              <tbody>
                {selectedPayslip.lines.map((line, idx) => (
                  <tr
                    key={idx}
                    style={{
                      backgroundColor: line.category === 'Net' ? 'var(--bg-green-soft)' : 'transparent',
                      fontWeight: line.category === 'Net' || line.category === 'Gross' ? 700 : 500
                    }}
                  >
                    <td style={{ color: line.category === 'Net' ? '#064E3B' : 'var(--text-primary)' }}>
                      {line.rule}
                    </td>
                    <td>
                      <span
                        className="status-pill"
                        style={{
                          backgroundColor:
                            line.category === 'Basic' ? '#EFF6FF' :
                            line.category === 'Allowance' ? '#ECFDF5' :
                            line.category === 'Deduction' ? '#FEF2F2' : '#F1F5F9',
                          color:
                            line.category === 'Basic' ? '#1D4ED8' :
                            line.category === 'Allowance' ? '#047857' :
                            line.category === 'Deduction' ? '#B91C1C' : '#0F172A'
                        }}
                      >
                        {line.category}
                      </span>
                    </td>
                    <td
                      style={{
                        color: line.category === 'Net' ? '#059669' : line.category === 'Deduction' ? '#DC2626' : 'var(--text-primary)',
                        fontWeight: 700
                      }}
                    >
                      {line.amount}
                    </td>
                    <td style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {line.code}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Payslips List View
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Payslips
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          List view of employee payslips with rule breakdowns and PDF printing
        </p>
      </div>

      <div className="odoo-control-bar">
        <div className="control-bar-left">
          <div className="search-input-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search payslips..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <span className="status-pill active" style={{ fontSize: '0.75rem' }}>
            Period: Feb 2026
          </span>
        </div>
      </div>

      <div className="table-panel">
        <table className="odoo-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Warning</th>
              <th>Period</th>
              <th>Basic</th>
              <th>Gross</th>
              <th>Net</th>
              <th>Structure</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr
                key={p.id}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedPayslip(p)}
              >
                <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{p.employeeName}</td>
                <td>
                  {p.warning !== '—' ? (
                    <span className="status-pill draft" style={{ fontSize: '0.72rem' }}>
                      <AlertTriangle size={12} />
                      {p.warning}
                    </span>
                  ) : (
                    <span style={{ color: 'var(--text-muted)' }}>—</span>
                  )}
                </td>
                <td>{p.period}</td>
                <td>{p.basic}</td>
                <td>{p.gross}</td>
                <td style={{ fontWeight: 800, color: '#059669' }}>{p.net}</td>
                <td>{p.structure}</td>
                <td>
                  <span className={`status-pill ${p.status === 'Paid' ? 'active' : 'draft'}`}>
                    ● {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
