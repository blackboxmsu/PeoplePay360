import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, ArrowLeft, Printer, CheckCircle, AlertTriangle, Download, X, Calendar } from 'lucide-react';
import store from '../../services/dataStore';

export default function PayslipsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const employeeFilter = searchParams.get('employee') || '';

  const [payruns, setPayruns] = useState(store.getPayruns());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayslip, setSelectedPayslip] = useState(null);

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setPayruns([...store.getPayruns()]);
    });
    return unsub;
  }, []);

  // Collect all payslips across payruns
  const allPayslips = [];
  payruns.forEach((pr) => {
    (pr.payslips || []).forEach((ps) => {
      allPayslips.push({
        ...ps,
        payrunName: pr.name,
        structure: ps.structure || pr.structure,
        period: ps.period || `${pr.periodStart} — ${pr.periodEnd}`
      });
    });
  });

  const filtered = allPayslips.filter((p) => {
    const matchesSearch =
      p.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.payrunName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.structure.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesEmployee = employeeFilter
      ? p.employeeName.toLowerCase() === employeeFilter.toLowerCase()
      : true;

    return matchesSearch && matchesEmployee;
  });

  // FORM VIEW
  if (selectedPayslip) {
    const lines = selectedPayslip.lines || [
      { ruleName: 'Basic Salary', category: 'Basic', code: 'BASIC', formattedAmount: `₹${Number(selectedPayslip.basic).toLocaleString('en-IN')}` },
      { ruleName: 'Gross Salary', category: 'Gross', code: 'GROSS', formattedAmount: `₹${Number(selectedPayslip.gross).toLocaleString('en-IN')}` },
      { ruleName: 'Net Salary', category: 'Net', code: 'NET', formattedAmount: `₹${Number(selectedPayslip.net).toLocaleString('en-IN')}` }
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
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
              {selectedPayslip.employeeName} — {selectedPayslip.payrunName}
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

        <div className="odoo-form-card">
          <div className="odoo-form-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                  Payslip / {selectedPayslip.employeeName}
                </h2>
                <span className={`status-pill ${selectedPayslip.status === 'Paid' ? 'running' : 'active'}`}>
                  ● {selectedPayslip.status}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Payrun: <strong>{selectedPayslip.payrunName}</strong> &nbsp;|&nbsp; Period: {selectedPayslip.period} &nbsp;|&nbsp; Structure: {selectedPayslip.structure}
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Net Payout
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#059669' }}>
                ₹{Number(selectedPayslip.net).toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          <div className="form-grid-2col">
            <div className="field-group">
              <label className="field-label">Employee</label>
              <input className="field-input" value={selectedPayslip.employeeName} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Salary Structure</label>
              <input className="field-input" value={selectedPayslip.structure} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Worked Days</label>
              <input className="field-input" value={`${selectedPayslip.workedDays || 22} Days`} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Payrun Batch</label>
              <input className="field-input" value={selectedPayslip.payrunName} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Contract Base Wage</label>
              <input className="field-input" value={`₹${Number(selectedPayslip.contractWage || selectedPayslip.basic * 2).toLocaleString('en-IN')}`} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Gross Salary</label>
              <input className="field-input" value={`₹${Number(selectedPayslip.gross).toLocaleString('en-IN')}`} readOnly style={{ fontWeight: 700, color: '#2563EB' }} />
            </div>
          </div>

          {/* Detailed Salary Rule Breakdown Lines */}
          <div style={{ marginTop: '24px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '10px', color: 'var(--text-primary)' }}>
              Salary Computation Lines
            </h3>
            <div className="table-panel">
              <table className="odoo-table" style={{ fontSize: '0.85rem' }}>
                <thead>
                  <tr>
                    <th style={{ width: '80px' }}>Seq</th>
                    <th>Salary Rule</th>
                    <th>Code</th>
                    <th>Category</th>
                    <th style={{ textAlign: 'right' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map((line, idx) => (
                    <tr key={idx}>
                      <td style={{ color: '#059669', fontWeight: 700 }}>{line.sequence || (idx + 1) * 10}</td>
                      <td style={{ fontWeight: 600 }}>{line.ruleName || line.rule}</td>
                      <td style={{ fontFamily: 'JetBrains Mono, monospace' }}>{line.code}</td>
                      <td>
                        <span className="status-pill" style={{ fontSize: '0.72rem' }}>
                          {line.category}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 800, color: line.category === 'Deduction' ? '#DC2626' : '#059669' }}>
                        {line.formattedAmount || `₹${Number(line.amount).toLocaleString('en-IN')}`}
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

  // LIST VIEW
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
          Payslips
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Individual employee payslips calculated by applicable period contracts and assigned salary structure rules
        </p>
      </div>

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
          <div className="search-input-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search payslips..."
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
              <th>Payrun</th>
              <th>Period</th>
              <th>Structure</th>
              <th>Basic</th>
              <th>Gross</th>
              <th>Net Payout</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, idx) => (
              <tr
                key={p.id || idx}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedPayslip(p)}
                title="Click to view full computation breakdown"
              >
                <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{p.employeeName}</td>
                <td>{p.payrunName}</td>
                <td>{p.period}</td>
                <td>{p.structure}</td>
                <td>₹{Number(p.basic).toLocaleString('en-IN')}</td>
                <td style={{ fontWeight: 600 }}>₹{Number(p.gross).toLocaleString('en-IN')}</td>
                <td style={{ fontWeight: 800, color: '#059669' }}>₹{Number(p.net).toLocaleString('en-IN')}</td>
                <td>
                  <span className={`status-pill ${p.status === 'Paid' ? 'running' : 'active'}`}>
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
