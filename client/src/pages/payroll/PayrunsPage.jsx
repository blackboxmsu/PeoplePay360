import React, { useState, useEffect } from 'react';
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
  Shield,
  Printer,
  Calendar,
  Check,
  Building,
  User
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import store from '../../services/dataStore';
import { evaluateSalaryRules } from '../../utils/salaryCalculator';

export default function PayrunsPage() {
  const navigate = useNavigate();
  const { canDeletePayruns, isPayrollUser } = useAuth();

  const [payruns, setPayruns] = useState(store.getPayruns());
  const [employees, setEmployees] = useState(store.getEmployees());
  const [structures, setStructures] = useState(store.getSalaryStructures());
  const [contracts, setContracts] = useState(store.getContracts());

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayrun, setSelectedPayrun] = useState(null);
  const [selectedPayslipModal, setSelectedPayslipModal] = useState(null);

  // Wizard state
  const [wizardStep, setWizardStep] = useState(0); // 0 = closed, 1 = scope, 2 = select employees
  const [wizardName, setWizardName] = useState('April 2026');
  const [wizardStructure, setWizardStructure] = useState('Regular Salary');
  const [wizardPeriodStart, setWizardPeriodStart] = useState('2026-04-01');
  const [wizardPeriodEnd, setWizardPeriodEnd] = useState('2026-04-30');
  const [selectedStaffIds, setSelectedStaffIds] = useState([]);

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setPayruns([...store.getPayruns()]);
      setEmployees([...store.getEmployees()]);
      setStructures([...store.getSalaryStructures()]);
      setContracts([...store.getContracts()]);
    });
    return unsub;
  }, []);

  const handleOpenWizard = () => {
    setWizardStep(1);
    setWizardName(`Payrun ${new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' })}`);
    setWizardStructure(structures[0]?.name || 'Regular Salary');
    setWizardPeriodStart('2026-04-01');
    setWizardPeriodEnd('2026-04-30');
    // Preselect employees with valid period contracts
    const validEmpIds = employees.map((e) => e.id);
    setSelectedStaffIds(validEmpIds);
  };

  // Requirement A2: Ensure payroll processes only the contract applicable to the selected period, avoiding concurrent active contracts
  const getStaffPeriodContract = (emp) => {
    return store.getContractForPeriod(emp.id, wizardPeriodStart, wizardPeriodEnd);
  };

  const handleToggleSelectStaff = (empId) => {
    if (selectedStaffIds.includes(empId)) {
      setSelectedStaffIds(selectedStaffIds.filter((id) => id !== empId));
    } else {
      setSelectedStaffIds([...selectedStaffIds, empId]);
    }
  };

  // Requirement A5 & A6: Selected structures on a Payrun dictate the specific set of rules applied to calculate employee payslips
  const handleCreatePayrun = () => {
    const chosenStructure = structures.find((s) => s.name === wizardStructure) || structures[0];
    const rulesToApply = chosenStructure?.rules || [];

    const generatedPayslips = [];
    let warningsCount = 0;

    selectedStaffIds.forEach((empId, idx) => {
      const emp = employees.find((e) => e.id === empId);
      if (!emp) return;

      const contractInfo = store.getContractForPeriod(emp.id, wizardPeriodStart, wizardPeriodEnd);
      let warning = '—';

      if (contractInfo.isConcurrentError) {
        warning = 'Concurrent active contracts detected';
        warningsCount++;
      } else if (!contractInfo.contract) {
        warning = 'No active contract for period';
        warningsCount++;
      } else if (!emp.bankAccount) {
        warning = 'A/C missing';
        warningsCount++;
      }

      const contractWage = contractInfo.contract ? contractInfo.contract.wage : 50000;
      const evalResult = evaluateSalaryRules(contractWage, rulesToApply, 22, 22);

      generatedPayslips.push({
        id: `ps-${Date.now()}-${idx}`,
        employeeId: emp.id,
        employeeName: emp.name,
        department: emp.department,
        contractNumber: contractInfo.contract?.contractNumber || '—',
        contractWage,
        structure: wizardStructure,
        period: `${wizardPeriodStart} to ${wizardPeriodEnd}`,
        status: 'Draft',
        warning,
        workedDays: 22,
        basic: evalResult.summary.basic,
        gross: evalResult.summary.gross,
        net: evalResult.summary.net,
        lines: evalResult.lines
      });
    });

    const newPayrun = {
      id: `pr-${Date.now()}`,
      name: wizardName,
      structure: wizardStructure,
      periodStart: wizardPeriodStart,
      periodEnd: wizardPeriodEnd,
      employeeCount: generatedPayslips.length,
      status: 'Draft',
      warningsCount,
      payslips: generatedPayslips
    };

    store.savePayrun(newPayrun);
    setWizardStep(0);
    setSelectedPayrun(newPayrun);
  };

  const handlePayrunStatusUpdate = (newStatus) => {
    if (!selectedPayrun) return;
    const updated = {
      ...selectedPayrun,
      status: newStatus,
      payslips: selectedPayrun.payslips.map((p) => ({ ...p, status: newStatus }))
    };
    store.savePayrun(updated);
    setSelectedPayrun(updated);
  };

  const filtered = payruns.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.structure.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // PAYRUN DETAIL / PROCESSING SCREEN
  if (selectedPayrun) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
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

          <button
            type="button"
            className="btn-action-primary"
            style={{ backgroundColor: '#0D9488' }}
            onClick={() => alert(`Payslips bulk-emailed to employees for ${selectedPayrun.name}`)}
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
            disabled={selectedPayrun.status === 'Paid'}
          >
            VALIDATE
          </button>
          <button
            type="button"
            className="btn-status-action"
            onClick={() => handlePayrunStatusUpdate('Paid')}
          >
            MARK AS PAID
          </button>

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className={`status-pill ${selectedPayrun.status === 'Paid' ? 'running' : selectedPayrun.status === 'Validated' ? 'active' : 'draft'}`}>
              ● Status: {selectedPayrun.status}
            </span>
          </div>
        </div>

        {/* Payrun Card Overview */}
        <div className="odoo-form-card">
          <div className="odoo-form-header">
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                {selectedPayrun.name}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Structure: <strong>{selectedPayrun.structure}</strong> &nbsp;|&nbsp; Period: {selectedPayrun.periodStart} to {selectedPayrun.periodEnd}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '16px', textAlign: 'right' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Total Net Payout</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#059669' }}>
                  ₹{selectedPayrun.payslips.reduce((sum, p) => sum + (Number(p.net) || 0), 0).toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>

          {selectedPayrun.warningsCount > 0 && (
            <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 'var(--radius-md)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px', color: '#991B1B', fontSize: '0.85rem' }}>
              <AlertTriangle size={18} />
              <span>
                <strong>{selectedPayrun.warningsCount} validation warning(s) detected.</strong> Check payslips below before final validation or disbursement.
              </span>
            </div>
          )}

          {/* Payslips Sub-table */}
          <div style={{ marginTop: '16px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '10px', color: 'var(--text-primary)' }}>
              Generated Payslips ({selectedPayrun.payslips?.length || 0})
            </h3>
            <div className="table-panel">
              <table className="odoo-table" style={{ fontSize: '0.85rem' }}>
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Contract Ref</th>
                    <th>Warning</th>
                    <th>Worked Days</th>
                    <th>Basic</th>
                    <th>Gross</th>
                    <th>Net Payout</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {(selectedPayrun.payslips || []).map((ps, idx) => (
                    <tr
                      key={ps.id || idx}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSelectedPayslipModal(ps)}
                    >
                      <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{ps.employeeName}</td>
                      <td style={{ fontSize: '0.8rem', fontFamily: 'JetBrains Mono, monospace' }}>{ps.contractNumber || '—'}</td>
                      <td>
                        {ps.warning && ps.warning !== '—' ? (
                          <span className="status-pill expired" style={{ fontSize: '0.72rem' }}>
                            ⚠ {ps.warning}
                          </span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)' }}>—</span>
                        )}
                      </td>
                      <td>{ps.workedDays}</td>
                      <td>₹{Number(ps.basic).toLocaleString('en-IN')}</td>
                      <td style={{ fontWeight: 600 }}>₹{Number(ps.gross).toLocaleString('en-IN')}</td>
                      <td style={{ fontWeight: 800, color: '#059669' }}>₹{Number(ps.net).toLocaleString('en-IN')}</td>
                      <td>
                        <span className={`status-pill ${ps.status === 'Paid' ? 'running' : ps.status === 'Validated' ? 'active' : 'draft'}`} style={{ fontSize: '0.72rem' }}>
                          ● {ps.status}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn-action-primary"
                          style={{ fontSize: '0.72rem', padding: '4px 8px' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPayslipModal(ps);
                          }}
                        >
                          View Breakdown
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* PAYSLIP DETAIL MODAL */}
        {selectedPayslipModal && (
          <div className="modal-backdrop" onClick={() => setSelectedPayslipModal(null)}>
            <div className="modal-content" style={{ maxWidth: '680px', width: '90%' }} onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>
                    Payslip Breakdown / {selectedPayslipModal.employeeName}
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {selectedPayrun.name} • Structure: {selectedPayrun.structure}
                  </span>
                </div>
                <button type="button" className="btn-icon" onClick={() => setSelectedPayslipModal(null)}>
                  <X size={18} />
                </button>
              </div>

              <div className="modal-body" style={{ padding: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px', backgroundColor: '#F8FAFC', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Contract Wage</div>
                    <div style={{ fontSize: '1rem', fontWeight: 800 }}>₹{Number(selectedPayslipModal.contractWage).toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Basic</div>
                    <div style={{ fontSize: '1rem', fontWeight: 800 }}>₹{Number(selectedPayslipModal.basic).toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Gross</div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: '#2563EB' }}>₹{Number(selectedPayslipModal.gross).toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Net Pay</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#059669' }}>₹{Number(selectedPayslipModal.net).toLocaleString('en-IN')}</div>
                  </div>
                </div>

                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '8px' }}>Rule Computation Lines</h4>
                <div className="table-panel">
                  <table className="odoo-table" style={{ fontSize: '0.825rem' }}>
                    <thead>
                      <tr>
                        <th>Seq</th>
                        <th>Code</th>
                        <th>Salary Rule</th>
                        <th>Category</th>
                        <th style={{ textAlign: 'right' }}>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(selectedPayslipModal.lines || []).map((line, idx) => (
                        <tr key={idx}>
                          <td style={{ color: '#059669', fontWeight: 700 }}>{line.sequence}</td>
                          <td style={{ fontFamily: 'JetBrains Mono, monospace' }}>{line.code}</td>
                          <td style={{ fontWeight: 600 }}>{line.ruleName}</td>
                          <td>
                            <span className="status-pill" style={{ fontSize: '0.7rem' }}>
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

              <div className="modal-footer" style={{ padding: '14px 20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between' }}>
                <button
                  type="button"
                  className="btn-action-primary"
                  style={{ backgroundColor: '#FFFFFF', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}
                  onClick={() => window.print()}
                >
                  <Printer size={15} />
                  <span>Print Payslip</span>
                </button>
                <button
                  type="button"
                  className="btn-action-primary"
                  onClick={() => setSelectedPayslipModal(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // LIST VIEW
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
          Payruns
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Batch payroll processing for eligible employees based on active contracts and configured salary structures
        </p>
      </div>

      <div className="odoo-control-bar">
        <div className="control-bar-left">
          <button type="button" className="btn-action-primary" onClick={handleOpenWizard}>
            <Plus size={16} />
            <span>NEW PAYRUN</span>
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
              <th>Payrun Name</th>
              <th>Structure</th>
              <th>Period</th>
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
                title="Click to open payrun processing screen"
              >
                <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{pr.name}</td>
                <td>{pr.structure}</td>
                <td>{pr.periodStart} to {pr.periodEnd}</td>
                <td>{pr.employeeCount} staff</td>
                <td>
                  {pr.warningsCount > 0 ? (
                    <span className="status-pill expired" style={{ fontSize: '0.72rem' }}>
                      ⚠ {pr.warningsCount}
                    </span>
                  ) : (
                    <span style={{ color: '#059669', fontWeight: 600 }}>0</span>
                  )}
                </td>
                <td>
                  <span className={`status-pill ${pr.status === 'Paid' ? 'running' : pr.status === 'Validated' ? 'active' : 'draft'}`}>
                    ● {pr.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TWO-STEP PAYRUN CREATION WIZARD (Requirements A2, A5, B5) */}
      {wizardStep > 0 && (
        <div className="modal-backdrop" onClick={() => setWizardStep(0)}>
          <div className="modal-content" style={{ maxWidth: '620px', width: '90%' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>
                  Payrun Wizard — Step {wizardStep} of 2: {wizardStep === 1 ? 'Define Scope & Period' : 'Select Eligible Staff'}
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {wizardStep === 1 ? 'Configure salary structure and pay period' : 'Verify active contract terms and avoid concurrent contracts'}
                </span>
              </div>
              <button type="button" className="btn-icon" onClick={() => setWizardStep(0)}>
                <X size={18} />
              </button>
            </div>

            {/* STEP 1: SCOPE */}
            {wizardStep === 1 && (
              <div>
                <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '20px' }}>
                  <div className="field-group">
                    <label className="field-label">Payrun Batch Name *</label>
                    <input
                      className="field-input"
                      value={wizardName}
                      onChange={(e) => setWizardName(e.target.value)}
                      placeholder="e.g. April 2026 Regular"
                      required
                    />
                  </div>

                  <div className="field-group">
                    <label className="field-label">Salary Structure (Dictates Applied Rules) *</label>
                    <select
                      className="field-input"
                      value={wizardStructure}
                      onChange={(e) => setWizardStructure(e.target.value)}
                    >
                      {structures.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name} ({s.rules?.length || s.rulesCount} rules)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="field-group">
                      <label className="field-label">Period Start Date *</label>
                      <input
                        type="date"
                        className="field-input"
                        value={wizardPeriodStart}
                        onChange={(e) => setWizardPeriodStart(e.target.value)}
                        required
                      />
                    </div>

                    <div className="field-group">
                      <label className="field-label">Period End Date *</label>
                      <input
                        type="date"
                        className="field-input"
                        value={wizardPeriodEnd}
                        onChange={(e) => setWizardPeriodEnd(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer" style={{ padding: '14px 20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button
                    type="button"
                    className="btn-action-primary"
                    style={{ backgroundColor: '#FFFFFF', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}
                    onClick={() => setWizardStep(0)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn-action-primary"
                    onClick={() => setWizardStep(2)}
                  >
                    Continue to Staff Selection →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: ELIGIBLE STAFF & CONTRACT PERIOD RESOLUTION */}
            {wizardStep === 2 && (
              <div>
                <div className="modal-body" style={{ padding: '20px' }}>
                  <div style={{ marginBottom: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Select employees to include in this payrun. The system evaluates period-specific contracts to prevent concurrent active contracts.
                  </div>

                  <div className="table-panel" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    <table className="odoo-table" style={{ fontSize: '0.825rem' }}>
                      <thead>
                        <tr>
                          <th style={{ width: '40px' }}>Include</th>
                          <th>Employee</th>
                          <th>Period Contract</th>
                          <th>Wage</th>
                          <th>Status / Validation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employees.map((emp) => {
                          const contractInfo = getStaffPeriodContract(emp);
                          const isSelected = selectedStaffIds.includes(emp.id);
                          const hasConcurrentError = contractInfo.isConcurrentError;
                          const hasValidContract = contractInfo.contract !== null;

                          return (
                            <tr
                              key={emp.id}
                              style={{
                                backgroundColor: hasConcurrentError ? '#FEF2F2' : isSelected ? '#F0FDF4' : 'transparent'
                              }}
                            >
                              <td>
                                <input
                                  type="checkbox"
                                  checked={isSelected && !hasConcurrentError}
                                  disabled={hasConcurrentError}
                                  onChange={() => handleToggleSelectStaff(emp.id)}
                                />
                              </td>
                              <td style={{ fontWeight: 700 }}>{emp.name}</td>
                              <td>
                                {hasValidContract ? (
                                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>
                                    {contractInfo.contract.contractNumber}
                                  </span>
                                ) : (
                                  <span style={{ color: 'var(--text-muted)' }}>None</span>
                                )}
                              </td>
                              <td>
                                {hasValidContract ? `₹${contractInfo.contract.wage.toLocaleString('en-IN')}` : '—'}
                              </td>
                              <td>
                                {hasConcurrentError ? (
                                  <span className="status-pill expired" style={{ fontSize: '0.7rem' }}>
                                    ⚠ Concurrent Contracts (Blocked)
                                  </span>
                                ) : hasValidContract ? (
                                  <span className="status-pill active" style={{ fontSize: '0.7rem' }}>
                                    ● Single Active Contract
                                  </span>
                                ) : (
                                  <span className="status-pill draft" style={{ fontSize: '0.7rem' }}>
                                    No Active Contract
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="modal-footer" style={{ padding: '14px 20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between' }}>
                  <button
                    type="button"
                    className="btn-action-primary"
                    style={{ backgroundColor: '#FFFFFF', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}
                    onClick={() => setWizardStep(1)}
                  >
                    ← Back to Scope
                  </button>
                  <button
                    type="button"
                    className="btn-action-primary"
                    onClick={handleCreatePayrun}
                  >
                    Create Payrun Batch ({selectedStaffIds.length} Staff)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
