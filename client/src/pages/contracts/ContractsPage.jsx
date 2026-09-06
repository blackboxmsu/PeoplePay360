import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Plus, ArrowLeft, Edit2, FileText, CheckCircle, Save, X, AlertTriangle, Clock } from 'lucide-react';
import store from '../../services/dataStore';
import { useAuth } from '../../context/AuthContext';

export default function ContractsPage() {
  const { canManageHR, isEmployeeSelf, user } = useAuth();
  const userName = user?.name || 'Parth Solanki';
  const [searchParams, setSearchParams] = useSearchParams();
  const employeeFilter = searchParams.get('employee') || '';

  const [contracts, setContracts] = useState(store.getContracts());
  const [workingSchedules, setWorkingSchedules] = useState(store.getWorkingSchedules());
  const [salaryStructures, setSalaryStructures] = useState(store.getSalaryStructures());
  const [employees, setEmployees] = useState(store.getEmployees());

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContract, setSelectedContract] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    id: '',
    contractNumber: '',
    employeeId: '',
    employeeName: '',
    startDate: '2026-01-01',
    endDate: '',
    duration: '',
    wage: 85000,
    status: 'Running',
    department: 'Finance',
    jobPosition: 'Payroll Specialist',
    workingScheduleId: 'ws-1',
    workingSchedule: 'Standard 40 Hours',
    structureType: 'Regular Salary',
    notes: ''
  });

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setContracts([...store.getContracts()]);
      setWorkingSchedules([...store.getWorkingSchedules()]);
      setSalaryStructures([...store.getSalaryStructures()]);
      setEmployees([...store.getEmployees()]);
    });
    return unsub;
  }, []);

  const handleOpenContract = (c) => {
    setSelectedContract(c);
    setIsEditing(false);
    setFormData({
      ...c,
      wage: typeof c.wage === 'number' ? c.wage : parseInt(String(c.wage).replace(/[^0-9]/g, '')) || 0
    });
  };

  const handleNewContract = () => {
    const newCon = {
      id: `con-${Date.now()}`,
      contractNumber: `CON/2026/00${contracts.length + 1}`,
      employeeId: employees[0]?.id || 'emp-1',
      employeeName: employees[0]?.name || 'Aarav Mehta',
      startDate: '2026-01-01',
      endDate: '',
      duration: 'Ongoing (Started 01-Jan-2026)',
      wage: 80000,
      status: 'Running',
      department: employees[0]?.department || 'Finance',
      jobPosition: employees[0]?.jobPosition || 'Specialist',
      workingScheduleId: workingSchedules[0]?.id || 'ws-1',
      workingSchedule: workingSchedules[0]?.name || 'Standard 40 Hours',
      structureType: 'Regular Salary',
      notes: 'New contract terms governing period payroll calculation.'
    };
    setSelectedContract(newCon);
    setIsEditing(true);
    setFormData(newCon);
  };

  const handleSave = (e) => {
    e.preventDefault();

    // Requirement A2: Prevent multiple concurrent active/running contracts for the same employee
    if (formData.status === 'Running') {
      const existingRunning = contracts.find(c =>
        c.id !== formData.id &&
        c.employeeId === formData.employeeId &&
        c.status === 'Running'
      );
      if (existingRunning) {
        const confirmSwitch = window.confirm(
          `Notice: Employee ${formData.employeeName || 'this staff member'} already has an active Running contract (${existingRunning.contractNumber}).\n\nTo prevent concurrent contract collision during payruns, would you like to set the existing contract to 'Expired' and make this contract the active Running one?`
        );
        if (confirmSwitch) {
          const updatedOld = { ...existingRunning, status: 'Expired' };
          store.saveContract(updatedOld);
        } else {
          return;
        }
      }
    }

    // Derive duration string
    let derivedDuration = formData.duration;
    if (!derivedDuration) {
      if (!formData.endDate) {
        derivedDuration = `Ongoing (Started ${formData.startDate})`;
      } else {
        derivedDuration = `${formData.startDate} to ${formData.endDate}`;
      }
    }

    const toSave = {
      ...formData,
      duration: derivedDuration,
      wage: Number(formData.wage) || 0
    };

    store.saveContract(toSave);
    setSelectedContract(toSave);
    setIsEditing(false);
  };

  const filteredContracts = (contracts || []).filter((c) => {
    const cNum = (c.contractNumber || '').toLowerCase();
    const cEmpName = (c.employeeName || '').toLowerCase().trim();
    const cDept = (c.department || '').toLowerCase();
    const sTerm = (searchTerm || '').toLowerCase().trim();

    const matchesSearch =
      cNum.includes(sTerm) ||
      cEmpName.includes(sTerm) ||
      cDept.includes(sTerm);

    if (isEmployeeSelf) {
      const uName = (userName || '').toLowerCase().trim();
      const matchId = user?.employeeId && c.employeeId === user.employeeId;
      return matchesSearch && (matchId || (cEmpName && uName && cEmpName === uName));
    }

    const matchesEmployee = employeeFilter
      ? cEmpName === (employeeFilter || '').toLowerCase().trim() ||
        (c.employeeId && c.employeeId === employeeFilter)
      : true;

    return matchesSearch && matchesEmployee;
  });

  // FORM VIEW (Requirement A2: Contract forms capture employment terms including duration, department, position, wage, and salary structure)
  if (selectedContract) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              className="btn-action-primary"
              style={{ backgroundColor: '#FFFFFF', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}
              onClick={() => setSelectedContract(null)}
            >
              <ArrowLeft size={16} />
              <span>Contracts</span>
            </button>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{formData.contractNumber}</span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {canManageHR && (
              <>
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
              </>
            )}
          </div>
        </div>

        <div className="odoo-form-card">
          <div className="odoo-form-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                  Contract / {formData.contractNumber}
                </h2>
                <span className={`status-pill ${formData.status === 'Running' ? 'running' : 'expired'}`}>
                  ● {formData.status === 'Running' ? 'ACTIVE / RUNNING' : formData.status}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Employment terms governing period-specific compensation, working hours, and salary calculation
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Base Wage / Month
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#059669' }}>
                ₹{Number(formData.wage).toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          <div className="form-grid-2col">
            <div className="field-group">
              <label className="field-label">Employee *</label>
              {isEditing ? (
                <select
                  className="field-input"
                  value={formData.employeeName}
                  onChange={(e) => {
                    const emp = employees.find((emp) => emp.name === e.target.value);
                    setFormData({
                      ...formData,
                      employeeName: e.target.value,
                      employeeId: emp ? emp.id : formData.employeeId,
                      department: emp ? emp.department : formData.department,
                      jobPosition: emp ? emp.jobPosition : formData.jobPosition
                    });
                  }}
                >
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.name}>
                      {emp.name} ({emp.department})
                    </option>
                  ))}
                </select>
              ) : (
                <input className="field-input" value={formData.employeeName} readOnly />
              )}
            </div>

            <div className="field-group">
              <label className="field-label">Department *</label>
              {isEditing ? (
                <input
                  className="field-input"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                />
              ) : (
                <input className="field-input" value={formData.department} readOnly />
              )}
            </div>

            <div className="field-group">
              <label className="field-label">Job Position *</label>
              {isEditing ? (
                <input
                  className="field-input"
                  value={formData.jobPosition}
                  onChange={(e) => setFormData({ ...formData, jobPosition: e.target.value })}
                />
              ) : (
                <input className="field-input" value={formData.jobPosition} readOnly />
              )}
            </div>

            <div className="field-group">
              <label className="field-label">Employment Duration (Terms) *</label>
              {isEditing ? (
                <input
                  className="field-input"
                  value={formData.duration}
                  placeholder="e.g. Ongoing or 12 Months (01-Jan-2026 to 31-Dec-2026)"
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
              ) : (
                <input className="field-input" value={formData.duration || `${formData.startDate} - ${formData.endDate || 'Ongoing'}`} readOnly />
              )}
            </div>

            <div className="field-group">
              <label className="field-label">Start Date *</label>
              {isEditing ? (
                <input
                  type="date"
                  className="field-input"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              ) : (
                <input className="field-input" value={formData.startDate} readOnly />
              )}
            </div>

            <div className="field-group">
              <label className="field-label">End Date (Leave blank if Ongoing)</label>
              {isEditing ? (
                <input
                  type="date"
                  className="field-input"
                  value={formData.endDate || ''}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              ) : (
                <input className="field-input" value={formData.endDate || 'Ongoing / Indefinite'} readOnly />
              )}
            </div>

            <div className="field-group">
              <label className="field-label">Base Wage / Month (₹) *</label>
              {isEditing ? (
                <input
                  type="number"
                  className="field-input"
                  value={formData.wage}
                  onChange={(e) => setFormData({ ...formData, wage: parseFloat(e.target.value) || 0 })}
                  style={{ fontWeight: 700, color: '#059669' }}
                />
              ) : (
                <input
                  className="field-input"
                  value={`₹${Number(formData.wage).toLocaleString('en-IN')}`}
                  readOnly
                  style={{ fontWeight: 700, color: '#059669' }}
                />
              )}
            </div>

            <div className="field-group">
              <label className="field-label">Salary Structure *</label>
              {isEditing ? (
                <select
                  className="field-input"
                  value={formData.structureType}
                  onChange={(e) => setFormData({ ...formData, structureType: e.target.value })}
                >
                  {salaryStructures.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name} ({s.rules?.length || s.rulesCount} rules)
                    </option>
                  ))}
                </select>
              ) : (
                <input className="field-input" value={formData.structureType} readOnly />
              )}
            </div>

            <div className="field-group">
              <label className="field-label">Working Schedule (A3 Assigned) *</label>
              {isEditing ? (
                <select
                  className="field-input"
                  value={formData.workingScheduleId}
                  onChange={(e) => {
                    const ws = workingSchedules.find((w) => w.id === e.target.value);
                    setFormData({
                      ...formData,
                      workingScheduleId: e.target.value,
                      workingSchedule: ws ? ws.name : formData.workingSchedule
                    });
                  }}
                >
                  {workingSchedules.map((ws) => (
                    <option key={ws.id} value={ws.id}>
                      {ws.name} ({ws.weeklyHours || 40} hrs/wk)
                    </option>
                  ))}
                </select>
              ) : (
                <input className="field-input" value={formData.workingSchedule} readOnly />
              )}
            </div>

            <div className="field-group">
              <label className="field-label">Status *</label>
              {isEditing ? (
                <select
                  className="field-input"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="Running">Running (Active)</option>
                  <option value="Expired">Expired</option>
                  <option value="Draft">Draft</option>
                </select>
              ) : (
                <div>
                  <span className={`status-pill ${formData.status === 'Running' ? 'running' : 'expired'}`}>
                    ● {formData.status === 'Running' ? 'Active Running' : formData.status}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--bg-green-soft)', border: '1px solid var(--border-green)', borderRadius: 'var(--radius-lg)', padding: '16px', marginTop: '16px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#064E3B', marginBottom: '6px' }}>
              Payroll Period Compatibility Notice
            </h4>
            <p style={{ fontSize: '0.8rem', color: '#047857', margin: 0 }}>
              Payroll automatically evaluates contracts to process only the single contract applicable to the active payrun period. Concurrent active contracts for the same employee are flagged as critical errors.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // LIST VIEW (Requirement A2: Clearly highlight the active contract and key details)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
          Contracts
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Maintain historical contract records linked to employees; active running contracts are clearly highlighted
        </p>
      </div>

      {/* Active Filter Indicator */}
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
            <button type="button" className="btn-action-primary" onClick={handleNewContract}>
              <Plus size={16} />
              <span>NEW</span>
            </button>
          )}

          <div className="search-input-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search contracts by number, employee, department..."
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
              <th>Contract</th>
              <th>Employee</th>
              <th>Department</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Duration / Terms</th>
              <th>Wage / Month</th>
              <th>Salary Structure</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredContracts.map((c) => {
              const isRunning = c.status === 'Running';
              return (
                <tr
                  key={c.id}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: isRunning ? '#F0FDF4' : 'transparent',
                    borderLeft: isRunning ? '4px solid #10B981' : '4px solid transparent'
                  }}
                  onClick={() => handleOpenContract(c)}
                  title={isRunning ? 'Active Running Contract' : 'Historical Contract'}
                >
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                    {c.contractNumber}
                  </td>
                  <td style={{ fontWeight: 600 }}>{c.employeeName}</td>
                  <td>{c.department}</td>
                  <td>{c.startDate}</td>
                  <td>{c.endDate || '—'}</td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {c.duration || 'Standard Term'}
                  </td>
                  <td style={{ fontWeight: 700, color: isRunning ? '#059669' : 'var(--text-primary)' }}>
                    ₹{Number(c.wage).toLocaleString('en-IN')}
                  </td>
                  <td>
                    <span className="status-pill" style={{ fontSize: '0.72rem', backgroundColor: '#F1F5F9', color: '#0F172A' }}>
                      {c.structureType || 'Regular Salary'}
                    </span>
                  </td>
                  <td>
                    <span className={`status-pill ${isRunning ? 'running' : 'expired'}`} style={{ fontWeight: 700 }}>
                      ● {isRunning ? 'ACTIVE / RUNNING' : c.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
