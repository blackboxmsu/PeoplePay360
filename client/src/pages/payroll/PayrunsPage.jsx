import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Plus,
  ArrowLeft,
  CheckCircle,
  FileText,
  AlertTriangle,
  Send,
  Download,
  X,
  Trash2,
  Shield
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const INITIAL_PAYRUNS = [
  {
    id: 'pr-1',
    name: 'January 2026',
    structure: 'Regular Salary',
    periodStart: '01-Jan-2026',
    periodEnd: '31-Jan-2026',
    employeeCount: 4,
    status: 'Paid',
    warningsCount: 1,
    payslips: [
      { id: 'ps-1', employeeName: 'Aarav Mehta', warning: '—', workedDays: 22, basic: '₹50,000', gross: '₹80,000', net: '₹75,000', status: 'Paid' },
      { id: 'ps-2', employeeName: 'Sara Khan', warning: 'A/C missing', workedDays: 22, basic: '₹60,000', gross: '₹95,000', net: '₹88,000', status: 'Paid' },
      { id: 'ps-3', employeeName: 'John Dsouza', warning: '—', workedDays: 21, basic: '₹45,000', gross: '₹72,000', net: '₹66,000', status: 'Paid' },
      { id: 'ps-4', employeeName: 'Neha Patel', warning: '—', workedDays: 20, basic: '₹40,000', gross: '₹64,000', net: '₹59,000', status: 'Paid' }
    ]
  },
  {
    id: 'pr-2',
    name: 'February 2026',
    structure: 'Regular Salary',
    periodStart: '01-Feb-2026',
    periodEnd: '28-Feb-2026',
    employeeCount: 4,
    status: 'Validated',
    warningsCount: 2,
    payslips: [
      { id: 'ps-5', employeeName: 'Aarav Mehta', warning: '—', workedDays: 20, basic: '₹50,000', gross: '₹80,000', net: '₹75,000', status: 'Validated' },
      { id: 'ps-6', employeeName: 'Sara Khan', warning: 'A/C missing', workedDays: 20, basic: '₹60,000', gross: '₹95,000', net: '₹88,000', status: 'Validated' },
      { id: 'ps-7', employeeName: 'John Dsouza', warning: 'Duplicate', workedDays: 19, basic: '₹45,000', gross: '₹72,000', net: '₹66,000', status: 'Draft' },
      { id: 'ps-8', employeeName: 'Neha Patel', warning: '—', workedDays: 20, basic: '₹40,000', gross: '₹64,000', net: '₹59,000', status: 'Validated' }
    ]
  },
  {
    id: 'pr-3',
    name: 'March 2026',
    structure: 'Regular Salary',
    periodStart: '01-Mar-2026',
    periodEnd: '31-Mar-2026',
    employeeCount: 4,
    status: 'Draft',
    warningsCount: 0,
    payslips: [
      { id: 'ps-9', employeeName: 'Aarav Mehta', warning: '—', workedDays: 22, basic: '₹50,000', gross: '₹80,000', net: '₹75,000', status: 'Draft' },
      { id: 'ps-10', employeeName: 'Sara Khan', warning: '—', workedDays: 22, basic: '₹60,000', gross: '₹95,000', net: '₹88,000', status: 'Draft' }
    ]
  }
];

const ELIGIBLE_STAFF = [
  { id: 'e1', name: 'Aarav Mehta', hours: '40 hours/week', startDate: '01-Jan-2026', wage: '₹85,000' },
  { id: 'e2', name: 'Sara Khan', hours: '40 hours/week', startDate: '01-Jan-2026', wage: '₹95,000' },
  { id: 'e3', name: 'John Dsouza', hours: '40 hours/week', startDate: '01-Sep-2025', wage: '₹72,000' },
  { id: 'e4', name: 'Neha Patel', hours: '40 hours/week', startDate: '01-Jan-2026', wage: '₹68,000' }
];

export default function PayrunsPage() {
  const navigate = useNavigate();
  const { canDeletePayruns, isPayrollUser } = useAuth();
  const [payruns, setPayruns] = useState(INITIAL_PAYRUNS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayrun, setSelectedPayrun] = useState(null);

  // Wizard state
  const [wizardStep, setWizardStep] = useState(0); // 0 = closed, 1 = scope, 2 = select employees
  const [wizardStructure, setWizardStructure] = useState('Regular Salary');
  const [wizardPeriodStart, setWizardPeriodStart] = useState('2026-04-01');
  const [wizardPeriodEnd, setWizardPeriodEnd] = useState('2026-04-30');
  const [selectedStaffIds, setSelectedStaffIds] = useState(['e1', 'e2', 'e3', 'e4']);

  const handleCreatePayrun = () => {
    const newPayrun = {
      id: `pr-${Date.now()}`,
      name: 'April 2026',
      structure: wizardStructure,
      periodStart: wizardPeriodStart,
      periodEnd: wizardPeriodEnd,
      employeeCount: selectedStaffIds.length,
      status: 'Draft',
      warningsCount: 0,
      payslips: selectedStaffIds.map((sid, idx) => {
        const staff = ELIGIBLE_STAFF.find(e => e.id === sid);
        return {
          id: `ps-new-${idx}`,
          employeeName: staff.name,
          warning: '—',
          workedDays: 22,
          basic: '₹50,000',
          gross: '₹80,000',
          net: '₹75,000',
          status: 'Draft'
        };
      })
    };

    setPayruns([newPayrun, ...payruns]);
    setWizardStep(0);
    setSelectedPayrun(newPayrun);
  };

  const handlePayrunStatusUpdate = (newStatus) => {
    if (!selectedPayrun) return;
    const updated = {
      ...selectedPayrun,
      status: newStatus,
      payslips: selectedPayrun.payslips.map(p => ({ ...p, status: newStatus }))
    };
    setSelectedPayrun(updated);
    setPayruns(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const filtered = payruns.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.structure.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Payrun Detail / Processing Screen (Screenshot 6)
  if (selectedPayrun) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              className="btn-action-primary"
              style={{ backgroundColor: '#FFFFFF', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}
              onClick={() => setSelectedPayrun(null)}
            >
              <ArrowLeft size={16} />
              <span>Payruns</span>
            </button>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
              Payrun / {selectedPayrun.name}
            </span>
          </div>

          {/* SEND PAYSLIPS action */}
          <button
            type="button"
            className="btn-action-primary"
            style={{ backgroundColor: '#0D9488' }}
            onClick={() => alert(`Payslips emailed successfully for ${selectedPayrun.name}`)}
          >
            <Send size={15} />
            <span>SEND PAYSLIPS</span>
          </button>
        </div>

        {/* Processing Action Bar: COMPUTE, VALIDATE, MARK PAID */}
        <div className="action-buttons-bar">
          <button
            type="button"
            className="btn-status-action primary-flow"
            onClick={() => handlePayrunStatusUpdate('Computed')}
            disabled={selectedPayrun.status === 'Paid'}
          >
            COMPUTE
          </button>
          <button
            type="button"
            className="btn-status-action"
            onClick={() => handlePayrunStatusUpdate('Validated')}
            disabled={selectedPayrun.status === 'Draft' || selectedPayrun.status === 'Paid'}
          >
            VALIDATE
          </button>
          <button
            type="button"
            className="btn-status-action"
            onClick={() => handlePayrunStatusUpdate('Paid')}
            disabled={selectedPayrun.status !== 'Validated'}
          >
            MARK PAID
          </button>

          {canDeletePayruns && (
            <button
              type="button"
              className="btn-status-action"
              style={{ color: '#DC2626' }}
              onClick={() => {
                if (window.confirm(`Are you sure you want to delete payrun ${selectedPayrun.name}?`)) {
                  setPayruns(payruns.filter(p => p.id !== selectedPayrun.id));
                  setSelectedPayrun(null);
                }
              }}
            >
              <Trash2 size={14} />
              <span>DELETE</span>
            </button>
          )}

          {isPayrollUser && (
            <span className="status-pill active" style={{ fontSize: '0.72rem', padding: '3px 8px' }}>
              <Shield size={12} />
              <span>HR Payroll User (Compute / Validate / Mark Paid)</span>
            </span>
          )}

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Status:</span>
            <span className={`status-pill ${selectedPayrun.status === 'Paid' ? 'active' : selectedPayrun.status === 'Validated' ? 'active' : 'draft'}`}>
              ● {selectedPayrun.status}
            </span>
          </div>
        </div>

        {/* Payrun Overview Card */}
        <div className="odoo-form-card" style={{ padding: '20px' }}>
          <div className="form-grid-2col">
            <div className="field-group">
              <label className="field-label">Payrun Name</label>
              <input className="field-input" value={selectedPayrun.name} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Period</label>
              <input className="field-input" value={`${selectedPayrun.periodStart} — ${selectedPayrun.periodEnd}`} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Salary Structure</label>
              <input className="field-input" value={selectedPayrun.structure} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Status</label>
              <div>
                <span className={`status-pill ${selectedPayrun.status === 'Paid' ? 'active' : 'draft'}`}>
                  ● {selectedPayrun.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payslips in this Payrun (Screenshot 6) */}
        <div style={{ marginTop: '8px' }}>
          <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Payslips in this Payrun
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {selectedPayrun.payslips.length} employee payslips generated
            </span>
          </div>

          <div className="table-panel">
            <table className="odoo-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Warning</th>
                  <th>Worked</th>
                  <th>Basic</th>
                  <th>Gross</th>
                  <th>Net</th>
                  <th>Status</th>
                  <th>PDF</th>
                </tr>
              </thead>
              <tbody>
                {selectedPayrun.payslips.map((ps) => (
                  <tr
                    key={ps.id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/payroll/payslips')}
                  >
                    <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{ps.employeeName}</td>
                    <td>
                      {ps.warning !== '—' ? (
                        <span className="status-pill draft" style={{ fontSize: '0.72rem' }}>
                          <AlertTriangle size={12} />
                          {ps.warning}
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>—</span>
                      )}
                    </td>
                    <td>{ps.workedDays} days</td>
                    <td>{ps.basic}</td>
                    <td>{ps.gross}</td>
                    <td style={{ fontWeight: 800, color: '#059669' }}>{ps.net}</td>
                    <td>
                      <span className={`status-pill ${ps.status === 'Paid' || ps.status === 'Validated' ? 'active' : 'draft'}`}>
                        ● {ps.status}
                      </span>
                    </td>
                    <td onClick={(e) => { e.stopPropagation(); alert(`Downloading PDF for ${ps.employeeName}...`); }}>
                      <button
                        type="button"
                        style={{ border: 'none', background: 'transparent', color: '#059669', cursor: 'pointer' }}
                        title="Download PDF"
                      >
                        <Download size={16} />
                      </button>
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

  // Payruns List View
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Payruns
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Payrun view for payroll periods and batch calculations
        </p>
      </div>

      <div className="odoo-control-bar">
        <div className="control-bar-left">
          <button
            type="button"
            className="btn-action-primary"
            onClick={() => setWizardStep(1)}
          >
            <Plus size={16} />
            <span>NEW</span>
          </button>

          <div className="search-input-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search payruns..."
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
              <th>Period</th>
              <th>Salary Structure</th>
              <th>Employees</th>
              <th>Warnings</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((pr) => (
              <tr
                key={pr.id}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedPayrun(pr)}
              >
                <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{pr.name}</td>
                <td>{pr.structure}</td>
                <td>{pr.employeeCount} employees</td>
                <td>
                  {pr.warningsCount > 0 ? (
                    <span className="status-pill draft" style={{ fontSize: '0.72rem' }}>
                      <AlertTriangle size={12} />
                      {pr.warningsCount} warning{pr.warningsCount > 1 ? 's' : ''}
                    </span>
                  ) : (
                    <span style={{ color: 'var(--text-muted)' }}>No warnings</span>
                  )}
                </td>
                <td>
                  <span className={`status-pill ${pr.status === 'Paid' ? 'active' : pr.status === 'Validated' ? 'active' : 'draft'}`}>
                    ● {pr.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Two-step Payrun Creation Wizard (Screenshot 6) */}
      {wizardStep === 1 && (
        <div className="modal-overlay">
          <div className="modal-dialog">
            <div className="modal-header">
              <h3 className="modal-title">New Pay Run (Step 1 of 2: Scope)</h3>
              <button
                type="button"
                onClick={() => setWizardStep(0)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94A3B8' }}
              >
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="field-group">
                <label className="field-label">Pay Structure</label>
                <select
                  className="field-input"
                  value={wizardStructure}
                  onChange={(e) => setWizardStructure(e.target.value)}
                >
                  <option value="Regular Salary">Regular Salary</option>
                  <option value="Intern Salary">Intern Salary</option>
                  <option value="Contractor Fixed">Contractor Fixed</option>
                </select>
              </div>

              <div className="form-grid-2col">
                <div className="field-group">
                  <label className="field-label">Period Start Date</label>
                  <input
                    type="date"
                    className="field-input"
                    value={wizardPeriodStart}
                    onChange={(e) => setWizardPeriodStart(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label className="field-label">Period End Date</label>
                  <input
                    type="date"
                    className="field-input"
                    value={wizardPeriodEnd}
                    onChange={(e) => setWizardPeriodEnd(e.target.value)}
                  />
                </div>
              </div>

              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                * Note: Clicking Continue moves to employee selection. No database record is created yet.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn-status-action"
                onClick={() => setWizardStep(0)}
              >
                Discard
              </button>
              <button
                type="button"
                className="btn-action-primary"
                onClick={() => setWizardStep(2)}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {wizardStep === 2 && (
        <div className="modal-overlay">
          <div className="modal-dialog" style={{ maxWidth: '750px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Select Employee Records (Step 2 of 2)</h3>
              <button
                type="button"
                onClick={() => setWizardStep(0)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94A3B8' }}
              >
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Select eligible employees with active running contracts for this payroll batch:
              </p>

              <table className="odoo-table" style={{ fontSize: '0.825rem' }}>
                <thead>
                  <tr>
                    <th style={{ width: '40px' }}>
                      <input
                        type="checkbox"
                        checked={selectedStaffIds.length === ELIGIBLE_STAFF.length}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedStaffIds(ELIGIBLE_STAFF.map(s => s.id));
                          else setSelectedStaffIds([]);
                        }}
                      />
                    </th>
                    <th>Employee</th>
                    <th>Working Hours</th>
                    <th>Start Date</th>
                    <th>Wage</th>
                  </tr>
                </thead>
                <tbody>
                  {ELIGIBLE_STAFF.map((staff) => (
                    <tr key={staff.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedStaffIds.includes(staff.id)}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedStaffIds([...selectedStaffIds, staff.id]);
                            else setSelectedStaffIds(selectedStaffIds.filter(id => id !== staff.id));
                          }}
                        />
                      </td>
                      <td style={{ fontWeight: 700 }}>{staff.name}</td>
                      <td>{staff.hours}</td>
                      <td>{staff.startDate}</td>
                      <td style={{ color: '#059669', fontWeight: 700 }}>{staff.wage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn-status-action"
                onClick={() => setWizardStep(1)}
              >
                Back
              </button>
              <button
                type="button"
                className="btn-action-primary"
                onClick={handleCreatePayrun}
                disabled={selectedStaffIds.length === 0}
              >
                Create Payrun ({selectedStaffIds.length} Selected)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
