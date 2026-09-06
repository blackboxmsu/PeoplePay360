import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import store from '../../services/dataStore';
import { evaluateSalaryRules } from '../../utils/salaryCalculator';
import { downloadPayslipPDF } from '../../utils/pdfGenerator';
import {
  Search,
  ArrowLeft,
  Printer,
  Download,
  CheckCircle,
  AlertTriangle,
  Shield,
  FileText,
  Filter,
  RefreshCw
} from 'lucide-react';

function aggregatePayslips(payruns, employees, structures) {
  const empMap = new Map(employees.map(e => [e.id, e]));
  const structMap = new Map(structures.map(s => [s.name, s]));
  const all = [];

  payruns.forEach(payrun => {
    (payrun.payslips || []).forEach(p => {
      const emp = empMap.get(p.employeeId);
      const basicNum = typeof p.basic === 'number' ? p.basic : parseInt(String(p.basic || '0').replace(/[^0-9]/g, ''), 10) || 45000;
      const grossNum = typeof p.gross === 'number' ? p.gross : parseInt(String(p.gross || '0').replace(/[^0-9]/g, ''), 10) || Math.round(basicNum * 1.6);
      const netNum = typeof p.net === 'number' ? p.net : parseInt(String(p.net || '0').replace(/[^0-9]/g, ''), 10) || Math.round(grossNum * 0.9);

      let lines = p.lines;
      if (!lines || lines.length === 0) {
        const struct = structMap.get(p.structure || payrun.structure);
        if (struct && struct.rules && struct.rules.length > 0) {
          const evalRes = evaluateSalaryRules(p.contractWage || basicNum, struct.rules, p.workedDays || 22, 22);
          lines = evalRes.lines.map(l => ({
            rule: l.ruleName || l.code,
            category: l.category,
            amount: l.formattedAmount,
            code: l.code
          }));
        } else {
          const hra = Math.round(basicNum * 0.4);
          const std = Math.max(0, grossNum - basicNum - hra);
          const pf = Math.round(basicNum * 0.12);
          const pt = Math.max(0, grossNum - netNum - pf);
          lines = [
            { rule: 'Basic Salary', category: 'Basic', amount: `₹${basicNum.toLocaleString('en-IN')}`, code: 'BASIC' },
            { rule: 'House Rent Allowance (40%)', category: 'Allowance', amount: `₹${hra.toLocaleString('en-IN')}`, code: 'HRA' },
            { rule: 'Standard Allowance', category: 'Allowance', amount: `₹${std.toLocaleString('en-IN')}`, code: 'STD' },
            { rule: 'Gross Salary', category: 'Gross', amount: `₹${grossNum.toLocaleString('en-IN')}`, code: 'GROSS' },
            { rule: 'Provident Fund (12%)', category: 'Deduction', amount: `-₹${pf.toLocaleString('en-IN')}`, code: 'PF' },
            { rule: 'Professional Tax', category: 'Deduction', amount: `-₹${pt.toLocaleString('en-IN')}`, code: 'PT' },
            { rule: 'Net Salary', category: 'Net', amount: `₹${netNum.toLocaleString('en-IN')}`, code: 'NET' }
          ];
        }
      } else {
        lines = lines.map(l => ({
          rule: l.rule || l.ruleName || l.code,
          category: l.category,
          amount: typeof l.amount === 'number'
            ? `${l.category === 'Deduction' ? '-' : ''}₹${Math.abs(l.amount).toLocaleString('en-IN')}`
            : l.amount,
          code: l.code
        }));
      }

      all.push({
        id: p.id,
        payrunId: payrun.id,
        payrunName: payrun.name,
        period: p.period || (payrun.periodStart && payrun.periodEnd ? `${payrun.periodStart} — ${payrun.periodEnd}` : payrun.name),
        periodStart: payrun.periodStart,
        periodEnd: payrun.periodEnd,
        structure: p.structure || payrun.structure || 'Regular Salary',
        employeeId: p.employeeId,
        employeeName: p.employeeName || emp?.name || 'Employee',
        department: p.department || emp?.department || 'Operations',
        jobPosition: emp?.jobTitle || p.jobPosition || 'Employee Specialist',
        workedDays: p.workedDays || 22,
        status: p.status || payrun.status || 'Paid',
        warning: p.warning || '—',
        basic: `₹${basicNum.toLocaleString('en-IN')}`,
        gross: `₹${grossNum.toLocaleString('en-IN')}`,
        net: `₹${netNum.toLocaleString('en-IN')}`,
        basicNum,
        grossNum,
        netNum,
        lines
      });
    });
  });

  return all;
}

export default function PayslipsPage() {
  const { user, isEmployeeSelf, canAccessPayroll } = useAuth();
  const userName = user?.name || 'Parth Solanki';

  const [payruns, setPayruns] = useState(() => store.getPayruns());
  const [employees, setEmployees] = useState(() => store.getEmployees());
  const [structures, setStructures] = useState(() => store.getSalaryStructures());

  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedPayslip, setSelectedPayslip] = useState(null);

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setPayruns([...store.getPayruns()]);
      setEmployees([...store.getEmployees()]);
      setStructures([...store.getSalaryStructures()]);
    });
    return unsub;
  }, []);

  const allPayslips = useMemo(() => {
    return aggregatePayslips(payruns, employees, structures);
  }, [payruns, employees, structures]);

  // Keep selected payslip up to date if store updates
  useEffect(() => {
    if (selectedPayslip) {
      const fresh = allPayslips.find(p => p.id === selectedPayslip.id);
      if (fresh) {
        setSelectedPayslip(fresh);
      }
    }
  }, [allPayslips]);

  // If role is employee, ONLY show current user's payslips
  const baseList = useMemo(() => {
    if (isEmployeeSelf) {
      return allPayslips.filter(p => {
        const matchId = user?.employeeId && p.employeeId === user.employeeId;
        const matchName = p.employeeName && userName && p.employeeName.toLowerCase().trim() === userName.toLowerCase().trim();
        return matchId || matchName;
      });
    }
    return allPayslips;
  }, [isEmployeeSelf, allPayslips, user, userName]);

  const departments = useMemo(() => {
    const set = new Set(allPayslips.map(p => p.department).filter(Boolean));
    return ['ALL', ...Array.from(set).sort()];
  }, [allPayslips]);

  const filtered = useMemo(() => {
    return baseList.filter(p => {
      const matchSearch =
        p.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.payrunName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.period.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchDept = departmentFilter === 'ALL' || p.department === departmentFilter;
      const matchStatus = statusFilter === 'ALL' || p.status.toLowerCase() === statusFilter.toLowerCase();

      return matchSearch && matchDept && matchStatus;
    });
  }, [baseList, searchTerm, departmentFilter, statusFilter]);

  const handleMarkPaid = (payslip) => {
    const allPrs = store.getPayruns();
    const targetPr = allPrs.find(pr => pr.id === payslip.payrunId);
    if (targetPr && targetPr.payslips) {
      const slipIdx = targetPr.payslips.findIndex(s => s.id === payslip.id);
      if (slipIdx >= 0) {
        targetPr.payslips[slipIdx].status = 'Paid';
        store.savePayrun(targetPr);
      }
    }
  };

  const handleCompute = (payslip) => {
    const allPrs = store.getPayruns();
    const targetPr = allPrs.find(pr => pr.id === payslip.payrunId);
    if (targetPr && targetPr.payslips) {
      const slipIdx = targetPr.payslips.findIndex(s => s.id === payslip.id);
      if (slipIdx >= 0) {
        targetPr.payslips[slipIdx].status = 'Computed';
        store.savePayrun(targetPr);
      }
    }
  };

  // Form View
  if (selectedPayslip) {
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
              <span>Back to Payslips</span>
            </button>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
              {selectedPayslip.employeeName} ({selectedPayslip.period})
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              className="btn-action-primary"
              style={{ backgroundColor: '#059669', boxShadow: '0 4px 10px rgba(5, 150, 105, 0.25)' }}
              onClick={() => downloadPayslipPDF(selectedPayslip)}
            >
              <Download size={15} />
              <span>Download Payslip (PDF)</span>
            </button>

            <button
              type="button"
              className="btn-status-action"
              onClick={() => window.print()}
            >
              <Printer size={15} />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Action Bar (Only for Payroll managers & users) */}
        {canAccessPayroll && (
          <div className="action-buttons-bar">
            {selectedPayslip.status !== 'Paid' && (
              <>
                <button
                  type="button"
                  className="btn-status-action primary-flow"
                  onClick={() => handleCompute(selectedPayslip)}
                >
                  COMPUTE
                </button>
                <button
                  type="button"
                  className="btn-status-action"
                  onClick={() => handleMarkPaid(selectedPayslip)}
                >
                  MARK PAID
                </button>
              </>
            )}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Status:</span>
              <span className={`status-pill ${selectedPayslip.status === 'Paid' ? 'active' : 'draft'}`}>
                ● {selectedPayslip.status}
              </span>
            </div>
          </div>
        )}

        {/* Info Card */}
        <div className="odoo-form-card" style={{ padding: '24px' }}>
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
              <label className="field-label">Department</label>
              <input className="field-input" value={selectedPayslip.department} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Designation</label>
              <input className="field-input" value={selectedPayslip.jobPosition} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Salary Structure</label>
              <input className="field-input" value={selectedPayslip.structure} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Status</label>
              <div>
                <span className={`status-pill ${selectedPayslip.status === 'Paid' ? 'active' : 'draft'}`}>
                  ● {selectedPayslip.status}
                </span>
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Pay Run Batch</label>
              <input className="field-input" value={selectedPayslip.payrunName} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Worked Days</label>
              <input className="field-input" value={`${selectedPayslip.workedDays} Days`} readOnly />
            </div>
          </div>
        </div>

        {/* Salary Computation Breakdown Table */}
        <div style={{ marginTop: '8px' }}>
          <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Salary Computation Breakdown
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Rule-by-rule evaluation executed by the sequenced payroll engine
              </span>
            </div>

            <button
              type="button"
              className="btn-action-primary"
              style={{ padding: '6px 12px', fontSize: '0.8rem' }}
              onClick={() => downloadPayslipPDF(selectedPayslip)}
            >
              <Download size={14} />
              <span>Export PDF</span>
            </button>
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {isEmployeeSelf ? 'My Payslips' : 'Payslips'}
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {isEmployeeSelf
              ? `Personal salary disbursal records for ${userName}. Click Download PDF on any payslip.`
              : `List view of ${filtered.length} employee payslips with rule breakdowns and PDF printing`
            }
          </p>
        </div>

        {filtered.length > 0 && (
          <button
            type="button"
            className="btn-action-primary"
            onClick={() => downloadPayslipPDF(filtered[0])}
          >
            <Download size={15} />
            <span>Download Latest PDF</span>
          </button>
        )}
      </div>

      <div className="odoo-control-bar" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div className="control-bar-left" style={{ flex: '1 1 280px' }}>
          <div className="search-input-box" style={{ width: '100%' }}>
            <Search size={16} />
            <input
              type="text"
              placeholder="Search by employee, period or batch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {!isEmployeeSelf && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Filter size={14} style={{ color: 'var(--text-muted)' }} />
              <select
                className="field-input"
                style={{ padding: '6px 10px', fontSize: '0.82rem', width: 'auto' }}
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === 'ALL' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>

            <select
              className="field-input"
              style={{ padding: '6px 10px', fontSize: '0.82rem', width: 'auto' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Computed">Computed</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        )}

        {isEmployeeSelf && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#059669', fontWeight: 600 }}>
            <Shield size={14} />
            <span>Your Personal Salary Ledger</span>
          </div>
        )}
      </div>

      <div className="table-panel">
        <table className="odoo-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Warning</th>
              <th>Period</th>
              <th>Basic</th>
              <th>Gross</th>
              <th>Net</th>
              <th>Structure</th>
              <th>Status</th>
              <th style={{ textAlign: 'center' }}>PDF Download</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((p) => (
                <tr
                  key={p.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedPayslip(p)}
                >
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{p.employeeName}</td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{p.department}</td>
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
                  <td
                    style={{ textAlign: 'center' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadPayslipPDF(p);
                    }}
                  >
                    <button
                      type="button"
                      className="btn-action-primary"
                      style={{
                        padding: '4px 10px',
                        fontSize: '0.75rem',
                        backgroundColor: '#059669'
                      }}
                      title="Download PDF"
                    >
                      <Download size={13} />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
                  No payslips found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
